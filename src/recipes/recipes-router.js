const express = require('express'),
  RecipesService = require('./recipes-service'),
  IngredientsService = require('./ingredients-service'),
  { requireAuth } = require('../middleware/jwt-auth');

// const path = require('path');
const recipesRouter = express.Router();
const jsonBodyParser = express.json();

recipesRouter
  .route('/')
  .get((req, res, next) => {
    RecipesService.getAllRecipes(req.app.get('db'))
      .then(recipes => { res.json(recipes.map(RecipesService.serializeRecipe)); })
      .catch(next);
  })
  .post(requireAuth, jsonBodyParser, (req, res, next) => {
    const user_id = req.user.id;
    const { name, author, prep_time_hours, prep_time_minutes, servings, instructions, ingredients } = req.body;

    let newRecipe = { name, instructions };

    for (const [key, value] of Object.entries(newRecipe)) {
      if (value == null) {
        return res.status(400).json({
          error: `Missing ${key} in request body.`
        });
      } else if (!ingredients.ingredientsAddList.length) {
        return res.status(400).json({
          error: 'Missing ingredients. Please enter at least one ingredient.'
        });
      }
    }

    newRecipe = {
      ...newRecipe,
      author,
      prep_time_hours,
      prep_time_minutes,
      servings
    };

    //In a future build, this should use trx to rollback the recipe if the ingredients fail.
    RecipesService.insertRecipe(req.app.get('db'), RecipesService.serializeRecipe(newRecipe, user_id))
      .then(recipeId => {
        //Post recipe's ingredients.
        const ingredientsEntered = ingredients.ingredientsAddList.map(async ingredient => {
          await IngredientsService.insertIngredient(req.app.get('db'), IngredientsService.serializePostRecipeIngredient(ingredient, recipeId));
        });
        if (!ingredientsEntered) {
          return res.status(400).json({
            error: 'Issue posting ingredients.'
          });
        }
        const payload = recipeId;

        return res.status(200).json(payload);
      })
      .catch(next);
  });

recipesRouter
  .route('/:recipe_id')
  .all(checkRecipeExists)
  .get(requireAuth, async (req, res, next) => {
    const user_id = req.user.id;
    //Retrieve recipe data
    const recipe = await RecipesService.getById(
      req.app.get('db'),
      req.params.recipe_id
    );
    //Retrieve ingredient data
    let ingredients = await IngredientsService.getIngredientsByRecipe(
      req.app.get('db'),
      req.params.recipe_id
    );

    //Check if data exists.
    if (!recipe || !ingredients) {
      res.status(400).json({
        error: `Couldn't retrieve this recipe.`
      });
    }

    //Create async ingredients promises (requires an SQL interaction with unit database to retrieve all data)
    const ingredientPromises = ingredients.map(ingredient =>
      IngredientsService.serializeGetRecipeIngredient(req.app.get('db'), ingredient)
    );

    //Return results of promises with formatted unit data.
    ingredients = await Promise.all(ingredientPromises);

    //Prepare payload
    const payload = {
      recipe: RecipesService.serializeRecipe(recipe, user_id),
      ingredients: ingredients
    };

    res.status(200).json(payload);
  })
  //Amend a recipe. TODO change id to param.
  .patch(requireAuth, jsonBodyParser, (req, res, next) => {
    const user_id = req.user.id;
    const { id, name, author, prep_time_hours, prep_time_minutes, servings, instructions, ingredients } = req.body;
    const newRecipe = { id, user_id, name, author, instructions, prep_time_hours, prep_time_minutes, servings };

    const toAdd = ingredients.ingredientsAddList; //List of ingredients to add
    const toDelete = ingredients.ingredientsDeleteList; //List of ingredients to delete
    const toUpdate = ingredients.ingredientsEditList; //List of ingredients to edit

    //Amend recipe
    const recipePatched = RecipesService.updateRecipe(req.app.get('db'), RecipesService.serializeRecipe(newRecipe, user_id))
      .then(async () => {

        //Amend a recipe's ingredients.
        const added = await toAdd.map(ingredient => IngredientsService.insertIngredient(req.app.get('db'), IngredientsService.serializePostRecipeIngredient(ingredient)));
        //Delete ingredients.
        const deleted = await toDelete.map(ingredientId => IngredientsService.deleteIngredient(req.app.get('db'), ingredientId));
        //Update edited ingredients.
        const edited = await toUpdate.map(ingredient => IngredientsService.updateIngredient(req.app.get('db'), IngredientsService.serializeUpdateRecipeIngredient(ingredient)));

        if (!added || !deleted || !edited) {
          res.status(400).json({
            error: `There was a problem updating ingredients.`
          });
        }

        const payload = recipePatched.id;

        return res.status(200).json(payload)
      })
      .catch(next);
  })
  //Ingredients cascade delete on recipe delete.
  .delete(requireAuth, (req, res, next) => {
    RecipesService.deleteRecipe((req.app.get('db')), req.params.recipe_id)
      .then(() => {
        res.status(200).json('Success');
      }).catch(next);
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
        error: 'Sorry, that recipe doesn\'t exist.'
      });

    res.recipe = recipe;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = recipesRouter;