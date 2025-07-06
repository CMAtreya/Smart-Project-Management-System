const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const ChatRoom = require('../models/ChatRoom');
const Project = require('../models/Project');
const User = require('../models/User');

// Fetch all messages for a room
router.get('/:room', async (req, res) => {
  try {
    const messages = await Message.find({ room: req.params.room }).sort({ timestamp: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// Save messages (bulk)
router.post('/', async (req, res) => {
  try {
    const { room, messages } = req.body;
    if (!room || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid payload' });
    }
    const saved = await Message.insertMany(messages.map(m => ({ ...m, room })));
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save messages' });
  }
});

// Get team members for a chat room (by project ID or room ID)
router.get('/team/:projectId', async (req, res) => {
  try {
    const chatRoom = await ChatRoom.findOne({ project: req.params.projectId }).populate('members', 'name email role avatar');
    if (!chatRoom) return res.status(404).json({ error: 'Chat room not found' });
    res.json(chatRoom.members);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch team members' });
  }
});

module.exports = router;
