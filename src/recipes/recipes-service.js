const RecipesService = {
  getAllRecipes(db) {
    return db
      .from('recipes')
      .select('*');
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