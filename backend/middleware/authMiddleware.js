const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Ensure `JWT_SECRET` is defined
      if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined in environment variables');
      }

      // Get user from token
      req.user = await User.findById(decoded.id).select('name email _id');

      if (!req.user) {
        res.status(404);
        throw new Error('User not found');
      }

      next();
    } catch (error) {
      console.error('Token verification failed:', error.message);

      // Differentiating token errors
      if (error.name === 'TokenExpiredError') {
        res.status(401);
        throw new Error('Not authorized - Token expired');
      }

      res.status(401);
      throw new Error('Not authorized - Invalid token');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized - Token missing');
  }
});

module.exports = { protect };
