const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const Project = require('../models/Project');
const { authenticateUser, authorizeRoles } = require('../middleware/auth');

// Apply authentication middleware to all routes
router.use(authenticateUser);

// Get all tasks
// GET /api/tasks
router.get('/', async (req, res) => {
  try {
    const { projectId, status, priority, assignedTo } = req.query;
    const queryObject = {};
    
    // Filter by project
    if (projectId) {
      queryObject.project = projectId;
    }
    
    // Filter by status
    if (status) {
      queryObject.status = status;
    }
    
    // Filter by priority
    if (priority) {
      queryObject.priority = priority;
    }
    
    // Filter by assignee
    if (assignedTo) {
      queryObject.assignedTo = { $in: [assignedTo] };
    }
    
    const tasks = await Task.find(queryObject)
      .populate('project', 'title')
      .populate('assignedTo', 'name email')
      .populate('dependencies', 'title')
      .populate('createdBy', 'name email')
      .populate('comments.author', 'name email');
    
    res.status(200).json({ tasks, count: tasks.length });
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
});

// Get single task
// GET /api/tasks/:id
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate('project', 'title')
      .populate('assignedTo', 'name email')
      .populate('dependencies', 'title')
      .populate('createdBy', 'name email')
      .populate('comments.author', 'name email');
    
    if (!task) {
      return res.status(404).json({ message: `No task found with id ${req.params.id}` });
    }
    
    res.status(200).json({ task });
  } catch (error) {
    console.error('Get task error:', error);
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
});

// Create task
// POST /api/tasks
router.post('/', async (req, res) => {
  try {
    // Add the current user as the creator
    req.body.createdBy = req.user.userId;
    
    // Check if project exists
    const project = await Project.findById(req.body.project);
    if (!project) {
      return res.status(404).json({ message: `No project found with id ${req.body.project}` });
    }
    
    const task = await Task.create(req.body);
    
    // Populate the created task with related data
    const populatedTask = await Task.findById(task._id)
      .populate('project', 'title')
      .populate('assignedTo', 'name email')
      .populate('dependencies', 'title')
      .populate('createdBy', 'name email');
    
    res.status(201).json({ task: populatedTask });
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
});

// Update task
// PATCH /api/tasks/:id
router.patch('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({ message: `No task found with id ${req.params.id}` });
    }
    
    // Check if user is authorized to update the task
    // Only task creator, project manager, assigned team member, or admin can update
    const project = await Project.findById(task.project);
    const isAssignedToTask = task.assignedTo.some(id => id.toString() === req.user.userId);
    
    if (
      req.user.role !== 'admin' && 
      task.createdBy.toString() !== req.user.userId &&
      project.manager.toString() !== req.user.userId &&
      !isAssignedToTask
    ) {
      return res.status(403).json({ message: 'Not authorized to update this task' });
    }
    
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
      .populate('project', 'title')
      .populate('assignedTo', 'name email')
      .populate('dependencies', 'title')
      .populate('createdBy', 'name email')
      .populate('comments.author', 'name email');
    
    res.status(200).json({ task: updatedTask });
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
});

// Delete task
// DELETE /api/tasks/:id
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({ message: `No task found with id ${req.params.id}` });
    }
    
    // Check if user is authorized to delete the task
    // Only task creator, project manager, or admin can delete
    const project = await Project.findById(task.project);
    
    if (
      req.user.role !== 'admin' && 
      task.createdBy.toString() !== req.user.userId &&
      project.manager.toString() !== req.user.userId
    ) {
      return res.status(403).json({ message: 'Not authorized to delete this task' });
    }
    
    await Task.findByIdAndDelete(req.params.id);
    
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
});

// Add comment to task
// POST /api/tasks/:id/comments
router.post('/:id/comments', async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ message: 'Comment text is required' });
    }
    
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({ message: `No task found with id ${req.params.id}` });
    }
    
    const comment = {
      text,
      author: req.user.userId,
      createdAt: new Date()
    };
    
    task.comments.push(comment);
    await task.save();
    
    const updatedTask = await Task.findById(req.params.id)
      .populate('comments.author', 'name email');
    
    res.status(201).json({ 
      task: updatedTask,
      comment: updatedTask.comments[updatedTask.comments.length - 1]
    });
  } catch (error) {
    console.error('Add comment error:', error);
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
});

module.exports = router;