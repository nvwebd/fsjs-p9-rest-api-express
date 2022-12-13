const express = require('express');
const router = express.Router();

const asyncHandler = (cb) => {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};

router.get(
  '/users',
  asyncHandler((req, res) => {
    res.status(200);
    res.json({
      user: 'To Be Implemented',
    });
  })
);

router.post(
  '/users',
  asyncHandler((req, res) => {
    // Set Location Header to "/"
    res.setHeader('Location', '/');
    res.status(201);
    res.json({
      user: 'To Be Implemented',
    });
  })
);

router.get(
  '/courses',
  asyncHandler((req, res) => {
    res.status(200);
    res.json({
      user: 'To Be Implemented',
      courses: 'To Be Implemented',
    });
  })
);

router.get(
  '/courses/:id',
  asyncHandler((req, res) => {
    const courseId = req.params.id;

    res.status(200);
    res.json({
      user: 'To Be Implemented',
      course: 'To Be Implemented',
    });
  })
);

router.post(
  '/courses',
  asyncHandler((req, res) => {
    res.setHeader('Location', '/');
    res.status(201).end();
  })
);

router.put(
  '/courses/:id',
  asyncHandler((req, res) => {
    // update coresponding course
    const courseId = req.params.id;
    res.status(204).end();
  })
);

router.delete(
  '/courses/:id',
  asyncHandler((req, res) => {
    // delete coresponding course
    const courseId = req.params.id;
    res.status(204).end();
  })
);

router.get(
  '/',
  asyncHandler((req, res) => {
    res.json({
      message: 'Welcome to the REST API project!',
    });
  })
);

module.exports = router;
