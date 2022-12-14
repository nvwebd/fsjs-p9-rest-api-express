const express = require('express');
const router = express.Router();

const { Course } = require('../models');

router.get('/courses', (req, res) => {
  res.status(200);
  res.json({
    user: 'To Be Implemented',
    courses: 'To Be Implemented',
  });
});

router.get('/courses/:id', (req, res) => {
  const courseId = req.params.id;

  res.status(200);
  res.json({
    user: 'To Be Implemented',
    course: 'To Be Implemented',
  });
});

router.post('/courses', (req, res) => {
  res.setHeader('Location', '/');
  res.status(201).end();
});

router.put('/courses/:id', (req, res) => {
  // update coresponding course
  const courseId = req.params.id;
  res.status(204).end();
});

router.delete('/courses/:id', (req, res) => {
  // delete coresponding course
  const courseId = req.params.id;
  res.status(204).end();
});

module.exports = router;
