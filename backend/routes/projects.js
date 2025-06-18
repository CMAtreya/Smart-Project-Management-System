const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const { authenticateUser } = require('../middleware/auth');

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
      .populate('team', 'name members')
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

// GET /api/projects/my-projects
router.get('/my-projects', async (req, res) => {
  try {
    const projects = await Project.find({
      createdBy: req.user.userId
    })
      .populate('team', 'name')
      .populate('createdBy', 'name email')
      .sort({ updatedAt: -1 });

    res.status(200).json({ projects, count: projects.length });
  } catch (error) {
    console.error('Get user projects error:', error);
    res.status(500).json({ message: 'Failed to fetch your projects', error: error.message });
  }
});

// GET /api/projects/:id
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('team', 'name')
      .populate('createdBy', 'name email');

    if (!project) {
      return res.status(404).json({ message: `No project found with id ${req.params.id}` });
    }

    res.status(200).json({ project });
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({ message: 'Failed to fetch project', error: error.message });
  }
});

// POST /api/projects
router.post('/', async (req, res) => {
  try {
    const { title, description, startDate, endDate, team } = req.body;

    if (!title || !description || !startDate || !endDate || !team) {
      return res.status(400).json({
        message: 'Missing required fields: title, description, startDate, endDate, team'
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

    req.body.createdBy = req.user.userId;

    const project = await Project.create(req.body);

    const populatedProject = await Project.findById(project._id)
      .populate('team', 'name members')
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
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: `No project found with id ${req.params.id}` });
    }

    if (req.user.role !== 'admin' && project.createdBy.toString() !== req.user.userId) {
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
      .populate('team', 'name members')
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
      .populate('team', 'name members')
      .populate('createdBy', 'name email');

    res.status(200).json({ project: updatedProject });
  } catch (error) {
    console.error('Update progress error:', error);
    res.status(500).json({ message: 'Failed to update progress', error: error.message });
  }
});

module.exports = router;
