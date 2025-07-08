const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const { authenticateUser } = require('../middleware/auth');
const User = require('../models/User.js'); // ✅ Make sure this is added
const ChatRoom = require('../models/ChatRoom');

router.use(authenticateUser);

// GET /api/projects
router.get('/', async (req, res) => {
  try {
    const { status, priority, search, sortBy = 'createdAt', sortOrder = 'desc', page = 1, limit = 10 } = req.query;

    const query = {};
    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const projects = await Project.find(query)
      .populate('teamMembers', 'name role')
      .populate('createdBy', 'name email')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Project.countDocuments(query);

    res.status(200).json({
      projects,
      count: projects.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
    });
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ message: 'Failed to fetch projects', error: error.message });
  }
});

router.get('/projects', authenticateUser, async (req, res) => {
  try {
    const projects = await Project.find()
      .populate('teamMembers', 'name role')
      .populate('createdBy', 'name email');
    res.status(200).json({ projects });
  } catch (error) {
    console.error('Fetch projects error:', error);
    res.status(500).json({ message: 'Failed to fetch projects' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('teamMembers', 'name email role')
      .populate('createdBy', 'name email');

    if (!project) {
      return res.status(404).json({ message: `No project found with id ${req.params.id}` });
    }

    res.status(200).json(project); // you don’t need to wrap in { project }
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({ message: 'Failed to fetch project', error: error.message });
  }
});


// POST /api/projects
// POST /api/projects
const Notification = require('../models/notification'); // import at the top if not already

router.post('/create', async (req, res) => {
  try {
    const {
      title,
      description,
      startDate,
      endDate,
      priority,
      status,
      progress,
      teamMembers
    } = req.body;

    // Validation
    if (!title || !description || !startDate || !endDate || !teamMembers || !teamMembers.length) {
      return res.status(400).json({
        message: 'Missing required fields: title, description, startDate, endDate, teamMembers'
      });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({ message: 'Invalid date format' });
    }

    if (end <= start) {
      return res.status(400).json({ message: 'End date must be after start date' });
    }

    const teamMemberIds = teamMembers;
    req.body.createdBy = req.user?.userId || null;

    const project = await Project.create({
      title,
      description,
      startDate: start,
      endDate: end,
      priority,
      status,
      progress,
      teamMembers: teamMemberIds,
      createdBy: req.body.createdBy
    });

    await User.updateMany(
      { _id: { $in: teamMemberIds } },
      { $addToSet: { projects: project._id } }
    );

    if (req.body.createdBy && !teamMemberIds.includes(req.body.createdBy)) {
      await User.findByIdAndUpdate(
        req.body.createdBy,
        { $addToSet: { projects: project._id } }
      );
    }

    await ChatRoom.create({
      project: project._id,
      members: [...teamMemberIds, req.body.createdBy].filter(Boolean)
    });

    // ✅ Send notifications to creator + team
    const allRecipients = [req.body.createdBy, ...teamMemberIds];

    const notifications = allRecipients.map(userId => ({
      user: userId,
      type: 'project_created',
      message: `Project "${title}" has been created.`,
      link: `/projects/${project._id}`
    }));

    await Notification.insertMany(notifications);

    // ✅ Populate and return final result
    const populatedProject = await Project.findById(project._id)
      .populate('teamMembers', 'name email')
      .populate('createdBy', 'name email');

    res.status(201).json({ project: populatedProject });

  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({ message: 'Failed to create project', error: error.message });
  }
});



// PATCH /api/projects/:id
router.patch('/:id', async (req, res) => {
  try {
    console.log("id", req.params.id);
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: `No project found with id ${req.params.id}` });
    }

    // Allow admin, creator, or any team member to update
    const isTeamMember = project.teamMembers.map(id => id.toString()).includes(req.user.userId);
    if (req.user.role !== 'admin' && project.createdBy.toString() !== req.user.userId && !isTeamMember) {
      return res.status(403).json({ message: 'Not authorized to update this project' });
    }

    if (req.body.startDate || req.body.endDate) {
      const startDate = req.body.startDate ? new Date(req.body.startDate) : project.startDate;
      const endDate = req.body.endDate ? new Date(req.body.endDate) : project.endDate;

      if (endDate <= startDate) {
        return res.status(400).json({ message: 'End date must be after start date' });
      }
    }

    delete req.body.createdBy;
    delete req.body.createdAt;

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
      .populate('teamMembers', 'name email')
      .populate('createdBy', 'name email');

    res.status(200).json({ project: updatedProject });
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({ message: 'Failed to update project', error: error.message });
  }
});

// DELETE /api/projects/:id
router.delete('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: `No project found with id ${req.params.id}` });
    }

    if (req.user.role !== 'admin' && project.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this project' });
    }

    await Project.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({ message: 'Failed to delete project', error: error.message });
  }
});

// PATCH /api/projects/:id/progress
router.patch('/:id/progress', async (req, res) => {
  try {
    const { progress } = req.body;

    if (progress === undefined || progress < 0 || progress > 100) {
      return res.status(400).json({ message: 'Progress must be between 0 and 100' });
    }

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: `No project found with id ${req.params.id}` });
    }

    const isAuthorized =
      req.user.role === 'admin' ||
      project.createdBy.toString() === req.user.userId;

    if (!isAuthorized) {
      return res.status(403).json({ message: 'Not authorized to update project progress' });
    }

    project.progress = progress;

    if (progress === 100) {
      project.status = 'Completed';
    } else if (progress > 0 && project.status === 'Not Started') {
      project.status = 'In Progress';
    }

    await project.save();

    const updatedProject = await Project.findById(project._id)
      .populate('teamMembers', 'name email')
      .populate('createdBy', 'name email');

    res.status(200).json({ project: updatedProject });
  } catch (error) {
    console.error('Update progress error:', error);
    res.status(500).json({ message: 'Failed to update progress', error: error.message });
  }
});

// GET /api/projects/user/:userId - Get projects where user is a team member
router.get('/user/:userId', authenticateUser, async (req, res) => {
  try {
    const userId = req.params.userId;
    const projects = await Project.find({ teamMembers: userId })
      .populate('teamMembers', 'name role')
      .populate('createdBy', 'name email');
    console.log("projects:", projects);
    res.status(200).json({ projects });
  } catch (error) {
    console.error('Fetch user projects error:', error);
    res.status(500).json({ message: 'Failed to fetch user projects' });
  }
});

// GET /api/projects/created-by/:adminId - Get projects created by a specific admin
router.get('/created-by/:adminId', authenticateUser, async (req, res) => {
  try {
    const adminId = req.params.adminId;
    // Only allow if the requester is the same admin or is an admin
    if (req.user.role !== 'admin' || req.user.userId !== adminId) {
      return res.status(403).json({ message: 'Not authorized to view these projects' });
    }
    const projects = await Project.find({ createdBy: adminId })
      .populate('teamMembers', 'name role')
      .populate('createdBy', 'name email');
    res.status(200).json({ projects });
  } catch (error) {
    console.error('Fetch admin-created projects error:', error);
    res.status(500).json({ message: 'Failed to fetch admin-created projects' });
  }
});

module.exports = router;
