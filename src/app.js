require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV, CLIENT_ORIGIN } = require('./config');

//Routers
const recipesRouter = require('./recipes/recipes-router'),
  authRouter = require('./auth/auth-router'),
  usersRouter = require('./users/users-router'),
  unitsRouter = require('./units/units-router'),
  convertRouter = require('./convert/convert-router');

const app = express();

const morganOption = process.env.NODE_ENV === 'production' ? 'tiny' : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(
  cors({
    // origin: CLIENT_ORIGIN
  })
);

app.get('/', (req, res) => {
  res.send('We are go!');
});

app.use('/api/recipes', recipesRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/units', unitsRouter);
app.use('/api/convert', convertRouter);

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;
