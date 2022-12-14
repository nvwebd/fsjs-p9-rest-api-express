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

  console.log('userData: ', userData);

  const createdUser = await User.create(userData);

  console.log('created user: ', createdUser);

  res.setHeader('Location', '/');
  res.status(201);
  res.json({
    user: 'To Be Implemented',
  });
});

module.exports = router;
