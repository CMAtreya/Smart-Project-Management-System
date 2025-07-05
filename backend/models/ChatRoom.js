const mongoose = require('mongoose');

const chatRoomSchema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'projects', required: true, unique: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ChatRoom', chatRoomSchema);
