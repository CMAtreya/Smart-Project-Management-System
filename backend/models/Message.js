const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  room: { type: String, required: true },
  sender: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  avatar: { type: String },
});

module.exports = mongoose.model('Message', messageSchema);
