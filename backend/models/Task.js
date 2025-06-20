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
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Urgent'],
    default: 'Medium'
  },
  status: {
    type: String,
    enum: ['To Do', 'In Progress', 'In Review', 'Completed', 'Blocked'],
    default: 'To Do'
  },
  dueDate: {
    type: Date,
    required: [true, 'Please provide a due date']
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user', // ✅ matches user model
    required: [true, 'Please assign the task to someone']
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'projects', // ✅ matches project model
    required: [true, 'Please associate this task with a project']
  },
  tags: {
    type: [String],
    default: []
  },
  timeTracking: {
    estimated: {
      type: Number,
      default: 0,
      min: 0
    },
    spent: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user', // ✅ matches user model
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

// Automatically update `updatedAt` before save
TaskSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Task', TaskSchema);
