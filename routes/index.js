const express = require('express');
const router = express.Router();

const userRoutes = require('./users');
const courseRoutes = require('./courses');

// import user and courses routes
router.use('/users', userRoutes);
router.use('/courses', courseRoutes);

module.exports = router;
