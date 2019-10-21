const xss = require('xss');
const parse = require('postgres-interval');


const RecipesService = {
  //TODO: Make auth only
  getAllRecipes(db) {
    return db
      .from('recipes AS rec')
      .select(
        'rec.id',
        'rec.name',
        'rec.author',
        'rec.instructions',
        'rec.prep_time',
        'rec.servings',
        'rec.date_created',
        'rec.date_modified',
      );
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

  getUnitSetData(db, unit_set) {
    return db
      .from('units')
      .select('unit_data')
      .where('unit_set', unit_set);
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
      prep_time: recipe.prep_time.toPostgres(),
      servings: Number(recipe.servings),
      date_created: new Date(recipe.date_created),
      date_modified: new Date(recipe.date_modified) || null
    };
  },
};

module.exports = RecipesService;