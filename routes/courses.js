const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/authMiddleware');
const asyncHandler = require('../middleware/asyncMiddleware');

const { Course, User } = require('../models');

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
  authenticateUser,
  asyncHandler(async (req, res) => {
    const createData = req.body;

    await Course.create(createData);

    res.setHeader('Location', '/');
    res.status(201).end();
  })
);

router.put(
  '/:id',
  authenticateUser,
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
  authenticateUser,
  asyncHandler(async (req, res) => {
    const courseId = req.params.id;
    
    await Course.destroy({ where: { id: courseId }});
    
    res.status(204).end();
  })
);

module.exports = router;
