//New call for ingredients needed, as well as refactoring for new data structures!

const express = require('express'),
  RecipesService = require('./recipes-service'),
  { requireAuth } = require('../middleware/jwt-auth');

const recipesRouter = express.Router();
const bodyParser = express.json();

recipesRouter
  .route('/')
  //TODO require auth. to view all.
  .get((req, res, next) => {
    RecipesService.getAllPublicRecipes(req.app.get('db'))
      .then(recipes => { res.json(recipes.map(RecipesService.serializeRecipe)); })
      .catch(next);
  });

//TODO Post!!
// recipesRouter
//   .route('/')
//   .post( (req,res, next) => {
//     //TODO add user, ingredients
//     const { name, author, ingredients, instructions, prep_time, servings  } = req.body;
//     const newRecipe = { name, author, ingredients, instructions };

//     for (const [key, value] of Object.entries(newRecipe)) {
//       if (value == null) {
//         return res.status(400).json({
//           error: `Missing ${key} in request body.`
//         });
//       }
//     }
//     newRecipe.prep_time = prep_time;
//     newRecipe.servings = servings;
//   });


recipesRouter
  .route('/:recipe_id')
  .all(requireAuth)
  .all(checkRecipeExists)
  .get((req, res) => {
    res.json(RecipesService.serializeRecipe(res.recipe));
  });

recipesRouter.route('/:recipe_id/ingredients/')
  .all(requireAuth)
  .all(checkRecipeExists)
  .get((req, res, next) => {
    RecipesService.getIngredientsForRecipe(
      req.app.get('db'),
      req.params.recipe_id
    )
      .then(ingredients => {
        const promises = ingredients.map(ingredient =>
          RecipesService.serializeRecipeIngredient(req.app.get('db'), ingredient)
        );
        Promise.all(promises)
          .then( ingredients_data => {
            return res.json(ingredients_data)
          });
      })
      .catch(next);
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