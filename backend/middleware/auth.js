const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Environment variables should be set in a .env file
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

/**
 * Authentication middleware to protect routes
 * Verifies the JWT token from the Authorization header
 * Adds the user information to the request object
 */
const authenticateUser = async (req, res, next) => {
  try {
    // Check for Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authentication invalid' });
    }
    
    // Extract and verify token
    const token = authHeader.split(' ')[1];
    const payload = jwt.verify(token, JWT_SECRET);
    
    // Find user and add to request
    const user = await User.findById(payload.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    req.user = {
      userId: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    };
    
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ message: 'Authentication invalid', error: error.message });
  }
};

/**
 * Authorization middleware to restrict access based on user role
 * @param {Array} roles - Array of roles allowed to access the route
 */
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Unauthorized to access this route' });
    }
    
    next();
  };
};

module.exports = {
  authenticateUser,
  authorizeRoles
};