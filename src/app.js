require('dotenv').config();
const express = require('express'),
  morgan = require('morgan'),
  cors = require('cors'),
  helmet = require('helmet'),
  { NODE_ENV } = require('./config');

//Routers
const recipesRouter = require('./recipes/recipes-router'),
  authRouter = require('./auth/auth-router'),
  usersRouter = require('./users/users-router'),
  unitsRouter = require('./units/units-router');
const app = express();

const morganOption = (NODE_ENV === 'production');

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

app.use('/api/recipes', recipesRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/units', unitsRouter);

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === 'production') {
    //basic error on production
    response = { error: { message: 'server error' } };
  } else {
    //more complex error for development
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;
