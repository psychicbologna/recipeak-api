const express = require('express'),
  RecipesService = require('./recipes-service'),
  IngredientsService = require('./ingredients-service'),
  { requireAuth } = require('../middleware/jwt-auth');

const path = require('path');
const recipesRouter = express.Router();
const jsonBodyParser = express.json();

recipesRouter
  .route('/')
  //TODO require auth. to view all.
  .get((req, res, next) => {
    RecipesService.getAllPublicRecipes(req.app.get('db'))
      .then(recipes => { res.json(recipes.map(RecipesService.serializeRecipe)); })
      .catch(next);
  });

recipesRouter
  .route('/')
  .post(requireAuth, jsonBodyParser, (req, res, next) => {
    const { user_id, name, author, instructions, prep_time, servings, ingredients } = req.body;
    const newRecipe = { user_id, name, author, instructions };
    const newIngredients = ingredients;

    for (const [key, value] of Object.entries(newRecipe)) {
      if (value == null) {
        return res.status(400).json({
          error: `Missing ${key} in request body.`
        });
      } else if (!ingredients.length) {
        return res.status(400).json({
          error: 'Missing ingredients.'
        });
      }
    }
    newRecipe.prep_time = prep_time;
    newRecipe.servings = servings;

    RecipesService.insertRecipe(
      req.app.get('db'),
      newRecipe
    )
      .returning('id')
      .then(id => {
        IngredientsService.insertIngredients()
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${id}`));
        // .json(RecipesService.serializeRecipe())

        //   ingredients.map(ingredient => IngredientsService.serializePostRecipeIngredient(ingredient, id))
        // );
      });
  });


recipesRouter
  .route('/:recipe_id')
  .all(requireAuth)
  .all(checkRecipeExists)
  .get((req, res) => {
    RecipesService.getById(
      req.app.get('db'),
      req.params.recipe_id
    )
      .then(recipe => {
        res.json(RecipesService.serializeRecipe(recipe));
      });
  });

recipesRouter.route('/:recipe_id/ingredients')
  .all(requireAuth)
  .all(checkRecipeExists)
  .get((req, res, next) => {
    IngredientsService.getIngredientsByRecipe(
      req.app.get('db'),
      req.params.recipe_id
    )
      // .then(ingredients => res.json(ingredients))
      // .catch(next);
      .then(ingredients => {
        const promises = ingredients.map(ingredient =>
          IngredientsService.serializeGetRecipeIngredient(req.app.get('db'), ingredient)
        );
        Promise.all(promises)
          .then(ingredients_data => {
            return res.json(ingredients_data);
          });
      })
      .catch(next);
    //TODO Post route!!
  });


//TODO patches
recipesRouter.route('./ingredients/:ingredient_id')
  .all(requireAuth)
  .all(checkRecipeExists)
  .patch((req, res, next) => {
    RecipesService.getById(
      req.app.get('db'),
      req.params.recipe_id,
      req.params.ingredient_id,
    );
  })
  .delete((req, res, next) => {

  });

/* async/await syntax for promises */
async function checkRecipeExists(req, res, next) {
  try {
    const recipe = await RecipesService.getById(
      req.app.get('db'),
      req.params.recipe_id
    );

    if (!recipe)
      return res.status(404).json({
        error: 'Recipe doesn\'t exist.'
      });

    res.recipe = recipe;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = recipesRouter;