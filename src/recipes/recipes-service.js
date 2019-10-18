//TODO restructure these for the new data structure!

const xss = require('xss');

const RecipesService = {
  //TODO: Make auth only
  getAllRecipes(db) {
    return db
      .from('recipes')
      .select('*');
  },
  //TODO: add this to landing page.
  getAllPublicRecipes(db) {
    return db
      .from('recipes')
      .select('*')
      .where('recipe_public', 'true');
  },
  //TODO: Retrieves all recipes of a given user; future consideration, split this into public/private
  getAllUserRecipes(db, userid) {
    return db
      .from('recipes')
      .select('*')
      .where('user_id', userid);
  },
  getById(db, id) {
    return db
      .from('recipes')
      .select('*')
      .where({ id })
      .first();
  },
  getIngredientsForRecipe(db, recipe_id) {
    return db
      .from('ingredients AS ing')
      .select(
        'ing.id',
        'ing.amt',
        'ing.ingredient'
      )
      .where('ing.recipe_id', recipe_id);
  },
  deleteRecipe(db, id) {
    return db
      .from('recipes')
      .where({ id })
      .delete();
  },
  updateRecipe(db, id, newRecipeFields) {
    return db
      .from('recipes')
      .where({ id })
      .update(newRecipeFields);
  },

  serializeRecipe(recipe) {
    return {
      id: recipe.id,
      name: xss(recipe.name),
      author: xss(recipe.author),
      instructions: xss(recipe.instructions),
      prep_time: setInterval(recipe.prep_time),
      servings: Number(recipe.servings),
      date_created: new Date(recipe.date_created),
      date_modified: new Date(recipe.date_modified) || null
    };
  },

  serializeRecipeIngredient(ingredient) {
    return {
      id: ingredient.id,
      recipe_id: ingredient.recipe_id,
      amount: ingredient.amt,
      ingredientText: xss(ingredient.ingredient),

    };
  }
};

module.exports = RecipesService;