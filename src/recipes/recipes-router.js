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
  servings: recipe.servings,
  date_created: recipe.date_created
});

recipesRouter
  .route('/')
  //TODO require auth
  .get((req, res, next) => {
    RecipesService.getAllRecipes(req.app.get('db'))
      .then(recipes => { res.json(recipes.map(serializeRecipes)); })
      .catch(next);
  })
  .post( (req,res, next) => {
    //TODO add user, ingredients
    const { name, author, ingredients, instructions, prep_time, servings  } = req.body;
    const newRecipe = { name, author, ingredients, instructions };
    
    for (const [key, value] of Object.entries(newRecipe)) {
      if (value == null) {
        return res.status(400).json({
          error: `Missing ${key} in request body.`
        });
      }
    }
  });


recipesRouter
  .route('/:recipe_id')
  //TODO require auth
  .all(checkRecipeExists)
  .get((req, res) => {
    res.json(serializeRecipes(res.recipe));
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