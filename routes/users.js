const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/authMiddleware');
const asyncHandler = require('../middleware/asyncMiddleware');

const { User } = require('../models');

router.get('/', authenticateUser, asyncHandler(async (req, res) => {
  const user = req.currentUser;
  
  res.status(201).json(user);
}));

router.post('/', asyncHandler(async (req, res) => {
  try {
    const userData = req.body;
    
    await User.create(userData);
    res.setHeader('Location', '/').status(201).end();
  } catch (error) {
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      const errors = error.errors.map(err => err.message);
      res.status(400).json({ errors });
    } else {
      throw error;
    }
  }
}));

module.exports = router;
