const express = require('express'),
  RecipesService = require('./recipes-service');

const recipesRouter = express.Router();
const bodyParser = express.json()

const serializeRecipes = recipe => ({
  id: recipe.id,
  name: recipe.name,
  author: recipe.author,
  ingredients: recipe.ingredients,
  instructions: recipe.instructions,
  //TODO figure out how to structure the prep time, do I need a helper function here?
  prep_time: recipe.prep_time.minutes + " minutes",
  yield: recipe.yield,
  date_created: recipe.date_created
});

recipesRouter
  .route('/')
  .get((req, res, next) => {
    RecipesService.getAllRecipes(req.app.get('db'))
      .then(recipes => { res.json(recipes.map(serializeRecipes)); })
      .catch(next);
  });

recipesRouter
  .route('/:id')
  .get((req, res, next) => {
    RecipesService.getById(req.app.get('db'))
  });

module.exports = recipesRouter;