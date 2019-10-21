const xss = require('xss');
const parse = require('postgres-interval');

const IngredientsService = {

  getIngredientsByRecipe(db, recipe_id) {
    return db
      .from('ingredients AS ing')
      .select(
        'ing.id',
        'ing.amt',
        'ing.unit_set',
        'ing.unit_data',
        'ing.ingredient',
      )
      .where('ing.recipe_id', recipe_id);
  },

  getById(db, id) {
    return db
      .from('ingredients')
      .select('*')
      .where({ id })
      .first();
  },

  deleteIngredient(db, id) {
    return db
      .from('ingredients')
      .where({ id })
      .delete();
  },

  updateRecipe(db, id, newRecipeFields) {
    return db
      .from('ingredients')
      .where({ id })
      .update(newRecipeFields);
  },

  serializeRecipeIngredient(db, ingredient) {
    const returndata = {
      id: ingredient.id,
      recipe_id: ingredient.recipe_id,
      amount: ingredient.amt,
      unit_set: ingredient.unit_set,
      ingredient: xss(ingredient.ingredient),
    };
    if (!ingredient.unit_set) {
      returndata.unit_data = ingredient.unit_data;
      return returndata;
    } else {
      return this.getUnitSetData(db, ingredient.unit_set)
        .then(ud => {
          returndata.unit_data = xss(ud[0].unit_data);
          return returndata;
        });
    }
  }
};

module.exports = IngredientsService;