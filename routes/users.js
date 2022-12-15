const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/authMiddleware');
const asyncHandler = require('../middleware/asyncMiddleware');

const { User } = require('../models');

router.get('/', authenticateUser, asyncHandler(async (req, res) => {
  const user = req.currentUser;
  
  console.log('user: ', user);
  
  res.status(200).json(user);
}));

router.post('/', asyncHandler(async (req, res) => {
  const userData = req.body;
  
  await User.create(userData);
  
  res.setHeader('Location', '/').status(201).end();
}));

module.exports = router;
