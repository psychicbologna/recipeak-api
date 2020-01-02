const xss = require('xss');
const parse = require('postgres-interval');

const RecipesService = {
  //TODO: Make auth only
  getAllRecipes(db) {
    return db
      .from('recipes AS rec')
      .select(
        'rec.id',
        'rec.user_id',
        'rec.name',
        'rec.author',
        'rec.instructions',
        'rec.prep_time_hours',
        'rec.prep_time_minutes',
        'rec.servings',
        'rec.date_created',
      );
  },
  getById(db, id) {
    let recipe_data = db
      .from('recipes AS rec')
      .where('rec.id', id)
      .select(
        'rec.id',
        'rec.name',
        'rec.author',
        'rec.prep_time_hours',
        'rec.prep_time_minutes',
        'rec.instructions',
        'rec.servings',
        'rec.date_created',
      )
      .first();

    return recipe_data;
  },

  insertRecipe(db, newRecipe) {
    return db('recipes')
      .insert(newRecipe)
      .returning('id')
      .then(([id]) => id);
  },

  deleteRecipe(db, id) {
    return db
      .from('recipes')
      .where({ id })
      .delete();
  },

  updateRecipe(db, newRecipeFields) {
    return db
      .from('recipes')
      .where({ id: newRecipeFields.id })
      .update({ ...newRecipeFields });
  },

  serializeRecipe(recipe, userId) {

    const newRecipe = {
      user_id: recipe.user_id || userId,
      name: xss(recipe.name),
      author: xss(recipe.author),
      prep_time_hours: recipe.prep_time_hours,
      prep_time_minutes: recipe.prep_time_minutes,
      instructions: xss(recipe.instructions),
      servings: recipe.servings,
    };

    if (recipe.id) { newRecipe.id = recipe.id; }
    if (recipe.date_created) { newRecipe.date_created = recipe.date_created; }

    return newRecipe;
  },
};

module.exports = RecipesService;