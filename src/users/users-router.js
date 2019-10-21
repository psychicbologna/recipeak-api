const express = require('express');

const usersRouter = express.Router(),
  usersService = require('./users-service');

const jsonBodyParser = express.json();

usersRouter
  .post('/', jsonBodyParser, (req, res, next) => {
    const { password, username } = req.body;

    for (const field of ['first_name', 'last_name', 'username', 'password'])
      if (!req.body[field])
        return res.status(400).json({
          error: `Missing '${field}' in request body`
        });

    const passwordError = usersService.validatePassword(password);

    if (passwordError)
      return res.status(400).json({ error: passwordError });

    usersService.hasUserWithUsername(
      req.app.get('db'),
      username
    )
      .then(hasUserWithUsername => {
        if (hasUserWithUsername)
          return res.status(400).json({ error: 'Username already taken' });
        res.send('ok');
      })
      .catch(next);
  });

module.exports = usersRouter;