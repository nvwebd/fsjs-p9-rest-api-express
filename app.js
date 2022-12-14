'use strict';

const express = require('express');

const userRoutes = require('./routes/users');
const courseRoutes = require('./routes/courses');
const morgan = require('morgan');

const { sequelize } = require('./models');

// variable to enable global error logging
const enableGlobalErrorLogging =
  process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

sequelize
  .authenticate()
  .then(async () => {
    console.log('SQLite DB Connection has been established successfully.');
    // await sequelize.sync({ force: true });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

// create the Express app
const app = express();

// setup morgan which gives us http request logging
app.use(morgan('dev'));
app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', courseRoutes);

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: process.env.NODE_ENV === 'production' ? {} : err,
  });
});

// set our port
app.set('port', process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
