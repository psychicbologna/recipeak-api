//New call for ingredients needed, as well as refactoring for new data structures!

const express = require('express'),
  RecipesService = require('./recipes-service'),
  IngredientsService = require('./ingredients-service'),
  { requireAuth } = require('../middleware/jwt-auth');

const ingredientsRouter = express.Router();
const bodyParser = express.json();

ingredientsRouter.route('/:recipe_id/ingredients/')
  // .all(requireAuth)
  .all(checkRecipeExists)
  .get((req, res, next) => {
    IngredientsService.getIngredientsByRecipe(
      req.app.get('db'),
      req.params.recipe_id
    )
      .then(ingredients => {
        const promises = ingredients.map(ingredient =>
          RecipesService.serializeRecipeIngredient(req.app.get('db'), ingredient)
        );
        Promise.all(promises)
          .then( ingredients_data => {
            return res.json(ingredients_data);
          });
      })
      .catch(next);
    //TODO Post route!!
  });

ingredientsRouter.route('./:recipe_id/ingredients/:ingredient_id')
  // .all(requireAuth)
  .all(checkRecipeExists)
  .patch((req, res, next) => {
    RecipesService.getById(
      req.app.get('db'),
      req.params.recipe_id
    )
  })
  .delete((req, res, next) => {

  })

  
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

module.exports = ingredientsRouter;