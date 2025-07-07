const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/auth');
const Notification = require('../models/notification');

// Apply auth middleware to all routes
router.use(authenticateUser);

/**
 * Create a new notification
 */
router.post('/', async (req, res) => {
  const { user, type, message, link } = req.body;

  if (!user || !type || !message) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const notification = new Notification({ user, type, message, link });
    const savedNotification = await notification.save();
    res.status(201).json(savedNotification);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * Get all notifications for a user
 */
router.get('/:userId', async (req, res) => {
  if (req.params.userId !== req.user.userId) {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const notifications = await Notification.find({ user: req.params.userId }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * Get unread notifications for a user
 */
router.get('/:userId/unread', async (req, res) => {
  if (req.params.userId !== req.user.userId) {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const unread = await Notification.find({ user: req.params.userId, isRead: false }).sort({ createdAt: -1 });
    res.json(unread);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * Get notification counts
 */
router.get('/:userId/counts', async (req, res) => {
  if (req.params.userId !== req.user.userId) {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const total = await Notification.countDocuments({ user: req.params.userId });
    const unread = await Notification.countDocuments({ user: req.params.userId, isRead: false });
    res.json({ total, unread });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * Mark a single notification as read
 */
router.patch('/:id/read', async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) return res.status(404).json({ message: 'Notification not found' });

    // Optional: make sure this notification belongs to the current user
    if (notification.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    notification.isRead = true;
    const updated = await notification.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * Mark all notifications as read for a user
 */
router.patch('/:userId/mark-all-read', async (req, res) => {
  if (req.params.userId !== req.user.userId) {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    await Notification.updateMany({ user: req.params.userId, isRead: false }, { $set: { isRead: true } });
    res.json({ message: 'All notifications marked as read' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
