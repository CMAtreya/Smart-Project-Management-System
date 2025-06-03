const express = require('express');
const router = express.Router();
const Project = require('../models/Project');


// Apply authentication middleware to all routes
router.use(authenticateUser);

// Get all projects
// GET /api/projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find({})
      .populate('teamMembers', 'name email')
      .populate('manager', 'name email')
      .populate('createdBy', 'name email');
    
    res.status(200).json({ projects, count: projects.length });
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
});

// Get single project
// GET /api/projects/:id
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('teamMembers', 'name email')
      .populate('manager', 'name email')
      .populate('createdBy', 'name email');
    
    if (!project) {
      return res.status(404).json({ message: `No project found with id ${req.params.id}` });
    }
    
    res.status(200).json({ project });
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
});

// Create project
// POST /api/projects
router.post('/', async (req, res) => {
  try {
    req.body.createdBy = req.user.userId;
    
    const project = await Project.create(req.body);
    console.log('Project created:', project);
    res.status(201).json({ project });
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
});

// Update project
// PATCH /api/projects/:id
router.patch('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ message: `No project found with id ${req.params.id}` });
    }
    
    // Check if user is authorized to update the project
    // Only project manager, admin, or creator can update
    if (
      req.user.role !== 'admin' && 
      project.createdBy.toString() !== req.user.userId &&
      project.manager.toString() !== req.user.userId
    ) {
      return res.status(403).json({ message: 'Not authorized to update this project' });
    }
    
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('teamMembers', 'name email')
      .populate('manager', 'name email')
      .populate('createdBy', 'name email');
    
    res.status(200).json({ project: updatedProject });
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
});

// Delete project
// DELETE /api/projects/:id
router.delete('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ message: `No project found with id ${req.params.id}` });
    }
    
    await Project.findByIdAndDelete(req.params.id);
    
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
});

module.exports = router;