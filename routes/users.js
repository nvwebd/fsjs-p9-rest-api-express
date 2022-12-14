const express = require('express');
const router = express.Router();

const { User } = require('../models');

router.get('/', async (req, res) => {
  const users = await User.findAll();

  console.log('users: ', users);

  res.status(200);
  res.json({
    user: 'To Be Implemented',
  });
});

router.post('/', async (req, res) => {
  const userData = req.body;
  
  await User.create(userData);

  res.setHeader('Location', '/').status(201).end();
});

module.exports = router;
