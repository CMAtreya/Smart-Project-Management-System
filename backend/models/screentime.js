const mongoose = require('mongoose');

const screenTimeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: String,
    required: true // Format: 'YYYY-MM-DD'
  },
  totalMinutes: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true // adds createdAt and updatedAt fields
});

// Prevent duplicate entries for same user + date
screenTimeSchema.index({ user: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('ScreenTime', screenTimeSchema);
