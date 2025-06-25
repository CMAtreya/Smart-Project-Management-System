const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
  },
  type: {
    type: String,
    enum: ['meeting', 'deadline', 'task', 'event', 'reminder'], // Accept lowercase
    required: true,
  },
  startTime: {
    type: String, // You can also use Date if combining date+time
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'], // Accept lowercase
    default: 'medium',
  },
  location: {
    type: String,
    trim: true,
  },
  reminder: {
    type: Number, // Store as minutes before
    default: 15,
  },
  participants: {
    type: [String], // Array of participant names or IDs
    default: [],
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt
});

module.exports = mongoose.model('Event', eventSchema);
