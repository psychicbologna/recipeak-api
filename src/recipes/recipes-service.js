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
  getById(db, id) {
    let recipe_data = db
      .from('recipes AS rec')
      .where('rec.id', id)
      .select(
        'rec.id',
        'rec.name',
        'rec.author',
        'rec.prep_time',
        'rec.instructions',
        'rec.servings',
        'rec.date_created',
        'rec.date_modified'
      )
      .first();

    return recipe_data;
  },

  insertRecipe(db, id, newRecipe) {
    return db('recipes')
      .where({ id })
      .insert(newRecipe);
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
    // return recipe;
    return {
      id: recipe.id,
      name: xss(recipe.name),
      author: xss(recipe.author),
      instructions: xss(recipe.instructions),
      prep_time: recipe.prep_time.toPostgres(),
      servings: Number(recipe.servings),
      date_created: new Date(recipe.date_created),
      date_modified: new Date(recipe.date_modified) || null,
      ingredients: recipe.inglist
    };
  },
};

module.exports = RecipesService;