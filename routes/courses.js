const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/authMiddleware');
const asyncHandler = require('../middleware/asyncMiddleware');

const { Course, User } = require('../models');

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const allCourses = await Course.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'password']
          }
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
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'password']
          }
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
    try {
      const { body } = req;
      
      await Course.create(body);
      
      res.setHeader('Location', '/').status(201).end();
    } catch(error) {
      if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
        const errors = error.errors.map(err => err.message);
        res.status(400).json({ errors });
      } else {
        throw error;
      }
    }
  })
);

router.put(
  '/:id',
  authenticateUser,
  asyncHandler(async (req, res) => {
    try {
      const { currentUser, body, params } = req;
      const course = await Course.findByPk(params.id);
      
      if (!course) {
        res.status(404).json({ message: 'Course Not Found'})
      }
      
      if ( currentUser.id === course.userId ) {
        await course.update(body);
        res.status(204).end();
      } else {
        res.status(403).json({ message: 'Not Allowed'})
      }
    } catch (error) {
      if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
        const errors = error.errors.map(err => err.message);
        res.status(400).json({ errors });
      } else {
        throw error;
      }
    }
  })
);

router.delete(
  '/:id',
  authenticateUser,
  asyncHandler(async (req, res) => {
    try {
      const { currentUser, body, params } = req;
      const course = await Course.findByPk(params.id);
    
      if (!course) {
        res.status(404).json({ message: 'Course Not Found'})
      }
    
      if ( currentUser.id === course.userId ) {
        await course.destroy();
        res.status(204).end();
      } else {
        res.status(403).json({ message: 'Not Allowed'})
      }
    } catch (error) {
      console.error('Error Deleting Course: ', error)
    }
  })
);

module.exports = router;
