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
  }
};

module.exports = RecipesService;