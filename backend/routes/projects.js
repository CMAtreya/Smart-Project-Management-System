const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const { authenticateUser } = require('../middleware/auth'); // Import authentication middleware

// Apply authentication middleware to all routes
router.use(authenticateUser);

// Get all projects with filtering, sorting, and pagination
// GET /api/projects
router.get('/', async (req, res) => {
  try {
    const { status, priority, search, sortBy = 'createdAt', sortOrder = 'desc', page = 1, limit = 10 } = req.query;
    
    // Build query object
    const query = {};
    
    // Add filters
    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
    
    const projects = await Project.find(query)
      .populate('teamMembers', 'name email')
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
      pages: Math.ceil(total / parseInt(limit))
    });
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ message: 'Failed to fetch projects', error: error.message });
  }
});

// Get projects for current user
// GET /api/projects/my-projects
router.get('/my-projects', async (req, res) => {
  try {
    const projects = await Project.find({
      $or: [
        { createdBy: req.user.userId },
        { teamMembers: req.user.userId }
      ]
    })
      .populate('teamMembers', 'name email')
      .populate('createdBy', 'name email')
      .sort({ updatedAt: -1 });
    
    res.status(200).json({ projects, count: projects.length });
  } catch (error) {
    console.error('Get user projects error:', error);
    res.status(500).json({ message: 'Failed to fetch your projects', error: error.message });
  }
});

// Get single project
// GET /api/projects/:id
router.get('/:id', async (req, res) => {
  try {
    // Validate ObjectId format
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid project ID format' });
    }
    
    const project = await Project.findById(req.params.id)
      .populate('teamMembers', 'name email')
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

// Create project
// POST /api/projects
router.post('/', async (req, res) => {
  try {
    // Validate required fields
    const { title, description, startDate, endDate } = req.body;
    
    if (!title || !description || !startDate || !endDate) {
      return res.status(400).json({ 
        message: 'Missing required fields: title, description, startDate, endDate' 
      });
    }
    
    // Validate dates
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({ message: 'Invalid date format' });
    }
    
    if (end <= start) {
      return res.status(400).json({ message: 'End date must be after start date' });
    }
    
    // Set createdBy to current user
    req.body.createdBy = req.user.userId;
    
    const project = await Project.create(req.body);
    
    // Populate the created project before sending response
    const populatedProject = await Project.findById(project._id)
      .populate('teamMembers', 'name email')
      .populate('createdBy', 'name email');
    
    console.log('Project created:', project.title);
    res.status(201).json({ project: populatedProject });
  } catch (error) {
    console.error('Create project error:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: 'Validation failed', errors });
    }
    
    res.status(500).json({ message: 'Failed to create project', error: error.message });
  }
});

// Update project
// PATCH /api/projects/:id
router.patch('/:id', async (req, res) => {
  try {
    // Validate ObjectId format
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid project ID format' });
    }
    
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ message: `No project found with id ${req.params.id}` });
    }
    
    // Check authorization - only creator or admin can update
    if (req.user.role !== 'admin' && project.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to update this project' });
    }
    
    // Validate dates if they're being updated
    if (req.body.startDate || req.body.endDate) {
      const startDate = req.body.startDate ? new Date(req.body.startDate) : project.startDate;
      const endDate = req.body.endDate ? new Date(req.body.endDate) : project.endDate;
      
      if (endDate <= startDate) {
        return res.status(400).json({ message: 'End date must be after start date' });
      }
    }
    
    // Prevent updating createdBy and createdAt
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
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: 'Validation failed', errors });
    }
    
    res.status(500).json({ message: 'Failed to update project', error: error.message });
  }
});

// Delete project
// DELETE /api/projects/:id
router.delete('/:id', async (req, res) => {
  try {
    // Validate ObjectId format
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid project ID format' });
    }
    
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ message: `No project found with id ${req.params.id}` });
    }
    
    // Check authorization - only creator or admin can delete
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

// Update project progress
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
    
    // Check if user is authorized (creator, team member, or admin)
    const isAuthorized = req.user.role === 'admin' || 
                        project.createdBy.toString() === req.user.userId ||
                        project.teamMembers.includes(req.user.userId);
    
    if (!isAuthorized) {
      return res.status(403).json({ message: 'Not authorized to update project progress' });
    }
    
    project.progress = progress;
    
    // Auto-update status based on progress
    if (progress === 100) {
      project.status = 'Completed';
    } else if (progress > 0 && project.status === 'Not Started') {
      project.status = 'In Progress';
    }
    
    await project.save();
    
    const updatedProject = await Project.findById(req.params.id)
      .populate('teamMembers', 'name email')
      .populate('createdBy', 'name email');
    
    res.status(200).json({ project: updatedProject });
  } catch (error) {
    console.error('Update progress error:', error);
    res.status(500).json({ message: 'Failed to update progress', error: error.message });
  }
});

module.exports = router;