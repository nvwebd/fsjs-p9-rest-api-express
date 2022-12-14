const express = require('express');
const router = express.Router();

const { Course } = require('../models');
const asyncHandler = require('./utils/asyncHandler');

router.get('/', asyncHandler(async (req, res) => {
  res.status(200);
  res.json({
    user: 'To Be Implemented',
    courses: 'To Be Implemented',
  });
}));

router.get('/:id', asyncHandler((req, res) => {
  const courseId = req.params.id;
  
  res.status(200);
  res.json({
    user: 'To Be Implemented',
    course: 'To Be Implemented',
  });
}));

router.post('/', asyncHandler((req, res) => {
  res.setHeader('Location', '/');
  res.status(201).end();
}));

router.put('/:id', asyncHandler((req, res) => {
  // update coresponding course
  const courseId = req.params.id;
  res.status(204).end();
}));

router.delete('/:id', asyncHandler((req, res) => {
  // delete coresponding course
  const courseId = req.params.id;
  res.status(204).end();
}));

module.exports = router;
