'use strict';

const express = require('express');
// create the Express app
const app = express();

const rootRoutes = require('./routes');
const morgan = require('morgan');
const { sequelize } = require('./models');

// variable to enable global error logging
const enableGlobalErrorLogging =
  process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

/**
 * set up the sqlite connection
 */
(async () => {
  try {
    await sequelize.authenticate();
    console.log('SQLite DB Connection has been established successfully.');
  } catch(error) {
    console.error('Unable to connect to the database:', error);
  }
  
  try {
    await sequelize.sync();
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const errors = error.errors.map(err => err.message);
      console.error('Validation errors: ', errors);
    } else {
      throw error;
    }
  }
})();


// setup morgan which gives us http request logging
app.use(morgan('dev'));

/**
 * parse incoming requests with JSON
 */
app.use(express.json());

/**
 * import defined routes
 */
app.use('/api', rootRoutes);

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
  
  if (err) {
    console.log('err: ', err);
    res.status(err.status || 500).json({
      message: err.message,
      error: process.env.NODE_ENV === 'production' ? {} : err,
    });
  }
});

// set our port
app.set('port', process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
