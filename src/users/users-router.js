const express = require('express');
const path = require('path');
const usersRouter = express.Router(),
  UsersService = require('./users-service'),
  RecipesService = require('../recipes/recipes-service'),
  { requireAuth } = require('../middleware/jwt-auth');

const jsonBodyParser = express.json();

usersRouter
  .route('/home/:username')
  .all(requireAuth)
  .get((req, res, next) => {
    UsersService.getAllUserRecipes( req.app.get('db'), req.user.username )
      .then(recipes => { res.json(recipes.map(RecipesService.serializeRecipe)); })
      .catch(next);
  });

usersRouter
  .post('/', jsonBodyParser, (req, res, next) => {
    const { password, username, first_name, last_name } = req.body;

    for (const field of ['first_name', 'last_name', 'username', 'password'])
      if (!req.body[field])
        return res.status(400).json({
          error: `Missing '${field}' in request body`
        });

    const passwordError = UsersService.validatePassword(password);

    if (passwordError)
      return res.status(400).json({ error: passwordError });

    UsersService.hasUserWithUsername(
      req.app.get('db'),
      username
    )
      .then(hasUserWithUsername => {
        if (hasUserWithUsername)
          return res.status(400).json({ error: 'Username already taken' });

        return UsersService.hashPassword(password)
          .then(hashedPassword => {
            const newUser = {
              username,
              password: hashedPassword,
              first_name,
              last_name,
              date_created: 'now()',
            };

            return UsersService.insertUser(
              req.app.get('db'),
              newUser
            )
              .then(user => {
                res
                  .status(201)
                  .location(path.posix.join(req.originalUrl, `/${user.id}`))
                  .json(UsersService.serializeUser(user));
              });
          });
      })
      .catch(next);
  });

module.exports = usersRouter;