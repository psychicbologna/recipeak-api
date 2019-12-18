const express = require('express');
const path = require('path');
const usersRouter = express.Router(),
  UsersService = require('./users-service'),
  RecipesService = require('../recipes/recipes-service'),
  AuthService = require('../auth/auth-service'),
  { requireAuth } = require('../middleware/jwt-auth');

const jsonBodyParser = express.json();

usersRouter
  .route('/')
  //Retrieve all user info after login.
  .get(async (req, res, next) => {

    //Retrieve user ID from token
    const authToken = req.get('Authorization') || '';

    let bearerToken;
    if (!authToken.toLowerCase().startsWith('bearer ')) {
      return res.status(401).json({ error: 'Missing bearer token' });
    } else {
      bearerToken = authToken.slice(7, authToken.length);
    }

    const user_id = AuthService.verifyJwt(bearerToken).user_id;

    //Retrieve requested user data
    try {
      const user =  await UsersService.getAllUserData(req.app.get('db'), user_id);
      const recipes =  await UsersService.getAllUserRecipes(req.app.get('db'), user_id);

      if (!user) {
        return res.status(400).json({
          error: 'Something went wrong retrieving user data.'
        });
      }

      if (!recipes) {
        return res.status(400).json({
          error: 'Something went wrong retrieving recipes.'
        });
      }

      const data = {
        user,
        recipes: recipes.map(RecipesService.serializeRecipe),
        recipeCount: recipes.length,
      };

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  })
  .post(jsonBodyParser, (req, res, next) => {
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