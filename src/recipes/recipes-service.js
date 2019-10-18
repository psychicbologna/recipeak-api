//TODO restructure these for the new data structure!

const xss = require('xss');

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

  getIngredientsForRecipe(db, recipe_id) {
    return db
      .from('ingredients AS ing')
      .select(
        'ing.id',
        'ing.amt',
        'ing.unit_set',
        'ing.unit_data',
        'ing.ingredient',
      )
      .where('recipe_id', recipe_id);
  },

  getAllUnitSets(db){
    return db
      .from('units')
      .select('*');
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
      prep_time: recipe.prep_time,
      servings: Number(recipe.servings),
      date_created: new Date(recipe.date_created),
      date_modified: new Date(recipe.date_modified) || null
    };
  },

  serializeRecipeIngredient(db, ingredient) {
    const returndata = {
      id: ingredient.id,
      recipe_id: ingredient.recipe_id,
      amount: ingredient.amt,
      unit_set: ingredient.unit_set,
      ingredientText: xss(ingredient.ingredient),
    };
    if (!ingredient.unit_set) {
      returndata.unit_data = ingredient.unit_data;
      return returndata;
    } else {
      return this.getUnitSetData(db, ingredient.unit_set)
        .then(ud => {
          returndata.unit_data = ud[0].unit_data;
          return returndata;
        });
    }
  }
};

module.exports = RecipesService;