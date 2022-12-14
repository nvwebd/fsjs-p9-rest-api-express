const express = require('express');
const router = express.Router();

const { Course, User } = require('../models');
const asyncHandler = require('./utils/asyncHandler');

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const allCourses = await Course.findAll({
      include: [
        {
          model: User,
          as: 'user',
        },
      ],
    });

    res.status(200).json(allCourses);
  })
);

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const courseId = req.params.id;

    const course = await Course.findByPk(courseId, {
      include: [
        {
          model: User,
          as: 'user',
        },
      ],
    });

    res.status(200).json(course);
  })
);

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const createData = req.body;

    await Course.create(createData);

    res.setHeader('Location', '/');
    res.status(201).end();
  })
);

router.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const courseId = req.params.id;
    const updateData = req.body;

    await Course.update(updateData, {
      where: {
        id: courseId,
      },
    });
    
    res.status(204).end();
  })
);

router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const courseId = req.params.id;
    
    await Course.destroy({ where: { id: courseId }});
    
    res.status(204).end();
  })
);

module.exports = router;
