const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a project title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a project description'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  startDate: {
    type: Date,
    required: [true, 'Please provide a start date'],
    validate: {
      validator: function(value) {
        return value instanceof Date && !isNaN(value);
      },
      message: 'Please provide a valid start date'
    }
  },
  endDate: {
    type: Date,
    required: [true, 'Please provide an end date'],
    validate: [
      {
        validator: function(value) {
          return value instanceof Date && !isNaN(value);
        },
        message: 'Please provide a valid end date'
      },
      {
        validator: function(value) {
          return !this.startDate || value >= this.startDate;
        },
        message: 'End date must be after start date'
      }
    ]
  },
  priority: {
    type: String,
    enum: {
      values: ['Low', 'Medium', 'High', 'Urgent'],
      message: 'Priority must be one of: Low, Medium, High, Urgent'
    },
    default: 'Medium'
  },
  status: {
    type: String,
    enum: {
      values: ['Not Started', 'In Progress', 'On Hold', 'Completed', 'Cancelled'],
      message: 'Status must be one of: Not Started, In Progress, On Hold, Completed, Cancelled'
    },
    default: 'Not Started'
  },
  progress: {
    type: Number,
    min: [0, 'Progress cannot be less than 0'],
    max: [100, 'Progress cannot be more than 100'],
    default: 0,
    validate: {
      validator: function(value) {
        return Number.isInteger(value);
      },
      message: 'Progress must be a whole number'
    }
  },
  teamMembers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  tags: [{
    type: String,
    trim: true,
    maxlength: [50, 'Tag cannot be more than 50 characters']
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Project must have a creator']
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true // Prevents modification after creation
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true, // Alternative to manual createdAt/updatedAt handling
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Index for better query performance
ProjectSchema.index({ createdBy: 1, status: 1 });
ProjectSchema.index({ startDate: 1, endDate: 1 });
ProjectSchema.index({ tags: 1 });

// Virtual for project duration in days
ProjectSchema.virtual('durationDays').get(function() {
  if (this.startDate && this.endDate) {
    const diffTime = Math.abs(this.endDate - this.startDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
  return null;
});

// Virtual for checking if project is overdue
ProjectSchema.virtual('isOverdue').get(function() {
  return this.endDate < new Date() && this.status !== 'Completed' && this.status !== 'Cancelled';
});

// Update the updatedAt field before saving (if not using timestamps option)
ProjectSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Validation middleware for business logic
ProjectSchema.pre('save', function(next) {
  // Auto-update progress based on status
  if (this.status === 'Completed' && this.progress !== 100) {
    this.progress = 100;
  } else if (this.status === 'Not Started' && this.progress > 0) {
    this.progress = 0;
  }
  
  next();
});

// Error handling for duplicate key errors
ProjectSchema.post('save', function(error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('Project with this title already exists'));
  } else {
    next(error);
  }
});

module.exports = mongoose.model('Project', ProjectSchema);