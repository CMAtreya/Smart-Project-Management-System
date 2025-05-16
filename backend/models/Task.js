const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a task title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a task description'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: [true, 'Task must be associated with a project']
  },
  assignedTo: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  startDate: {
    type: Date,
    required: [true, 'Please provide a start date']
  },
  dueDate: {
    type: Date,
    required: [true, 'Please provide a due date']
  },
  estimatedHours: {
    type: Number,
    min: 0
  },
  actualHours: {
    type: Number,
    min: 0,
    default: 0
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Urgent'],
    default: 'Medium'
  },
  status: {
    type: String,
    enum: ['To Do', 'In Progress', 'Review', 'Done'],
    default: 'To Do'
  },
  progress: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  dependencies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task'
  }],
  attachments: [{
    name: String,
    path: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  comments: [{
    text: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
TaskSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Task', TaskSchema);