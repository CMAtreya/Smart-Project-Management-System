const mongoose = require('mongoose');
const user = require('./User'); // Assuming you have a User model


const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    type: {
      type: String,
      enum: [
        'project_created',
        'task_created',
        'task_assigned',
        'task_completed',
        'deadline_updated',
        'task_overdue',
        'added_to_team',
        'custom'
      ],
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    link: {
      type: String, // for redirecting (optional)
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

module.exports = mongoose.model('Notification', notificationSchema);
