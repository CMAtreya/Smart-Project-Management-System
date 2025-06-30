const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const user = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';
const JWT_LIFETIME = process.env.JWT_LIFETIME || '30d';

// REGISTER
router.post('/register', async (req, res) => {
  try {
    console.log('Request Body:', req.body);

    const { name, email, password, role } = req.body;

    if (!['admin', 'user'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = await user.create({ name, email, password, role });

    const token = jwt.sign(
      { userId: newUser._id, name: newUser.name, role: newUser.role },
      JWT_SECRET,
      { expiresIn: JWT_LIFETIME }
    );

    res.status(201).json({
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      },
      token
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
});
// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password, role, adminSecretKey } = req.body || {};
    console.log('Login Request Body:', req.body);
  

    if (role === 'admin' && adminSecretKey !== process.env.ADMIN_SECRET_KEY) {
      return res.status(403).json({ message: 'Invalid admin secret key' });
    }

    const foundUser = await user.findOne({ email });
    if (!foundUser) return res.status(401).json({ message: 'Invalid credentials' });

    const isPasswordCorrect = await foundUser.comparePassword(password);
    if (!isPasswordCorrect) return res.status(401).json({ message: 'Invalid credentials' });

    if (foundUser.role !== role) {
      return res.status(403).json({ message: 'Role mismatch. Access denied.' });
    }

    const token = jwt.sign(
      { userId: foundUser._id, name: foundUser.name, role: foundUser.role },
      JWT_SECRET,
      { expiresIn: JWT_LIFETIME }
    );
    console.log('response:', res);
    console.log('Login successful for user:', foundUser.email);
    res.status(200).json({
      user: {
        id: foundUser._id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role
      },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
});

// GET CURRENT USER
router.get('/me', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authentication invalid' });
    }

    const token = authHeader.split(' ')[1];
    const payload = jwt.verify(token, JWT_SECRET);

    const foundUser = await user.findById(payload.userId).select('-password');
    if (!foundUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user: foundUser });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
});
// GET ALL NON-ADMIN USERS
router.get('/all-users', async (req, res) => {
  try {
    const users = await user.find({ role: 'user' }, 'name email role'); // Only users with role 'user'
    res.status(200).json(users);
  } catch (error) {
    console.error('Fetch users error:', error);
    res.status(500).json({ message: 'Failed to fetch users', error: error.message });
  }
});

// UPDATE USER PROFILE
router.put('/profile', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authentication invalid' });
    }

    const token = authHeader.split(' ')[1];
    const payload = jwt.verify(token, JWT_SECRET);

    const { name, email, password } = req.body;
    const updateData = {};
    
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    
    // Get the user first
    const userToUpdate = await user.findById(payload.userId);
    if (!userToUpdate) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Handle password update separately
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await user.findByIdAndUpdate(
      payload.userId,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
});

module.exports = router;
