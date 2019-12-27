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
  });

recipesRouter
  .route('/')
  //Post a new recipe.
  .post(requireAuth, jsonBodyParser, (req, res, next) => {
    const { user_id, name, author, instructions, prep_time, servings, ingredients } = req.body;
    const newRecipe = { user_id, name, author, instructions };

    for (const [key, value] of Object.entries(newRecipe)) {
      if (value == null) {
        return res.status(400).json({
          error: `Missing ${key} in request body.`
        });
      } else if (!ingredients.length) {
        return res.status(400).json({
          error: 'Missing ingredients. Please enter at least one ingredient.'
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
        //Post recipe's ingredients.
        ingredients.map(ingredient => {
          ingredient.recipe_id = id;
          IngredientsService.insertIngredients(ingredient);
          return res.status(201);
        });
      });
  });

recipesRouter
  .route('/:recipe_id')
  .all(checkRecipeExists)
  .get(requireAuth, async (req, res, next) => {

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
      recipe: RecipesService.serializeRecipe(recipe),
      ingredients: ingredients
    };

    res.status(200).json(payload);
  })
  //Amend a recipe. TODO change id to param.
  .patch(requireAuth, jsonBodyParser, async (req, res, next) => {
    const { user_id, name, author, instructions, prep_time, servings, ingredientsLists } = req.body;
    const newRecipe = { user_id, name, author, instructions, prep_time, servings };

    const deletedIngredients = ingredientsLists.deletedIngredients; //List of ingredients to delete
    const newIngredients = ingredientsLists.newIngredients; //List of ingredients to add
    const editedIngredients = ingredientsLists.editedIngredients; //List of ingredients to edit

    //Amend recipe
    RecipesService.patchRecipe(RecipesService.serializeRecipe(newRecipe))
      //Amend a recipe's ingredients.
      .then(() => {
        newIngredients.map(ingredient => IngredientsService.insertIngredient(IngredientsService.serializePostRecipeIngredient(ingredient)));
      })
      //Delete ingredients.
      .then(() => {
        deletedIngredients.map(ingredient => IngredientsService.deleteIngredient(ingredient.id));
      })
      //Update edited ingredients.
      .then(() => {
        editedIngredients.map(ingredient => IngredientsService.updateIngredient(IngredientsService.serializePostRecipeIngredient(ingredient)));
      })
      .then(() => res.status(204).end())
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