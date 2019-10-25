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
        'ing.ing_text',
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

  insertIngredient(db, ingredient) {
    return db
      .into('ingredients')
      .insert({ ingredient });
  },

  deleteIngredient(db, id) {
    return db
      .from('ingredients')
      .where({ id })
      .delete();
  },

  updateIngredient(db, id, newIngredientFields) {
    return db
      .from('ingredients')
      .where({ id })
      .update(newIngredientFields);
  },

  getUnitSetData(db, unit_set) {
    return db
      .from('units')
      .select('unit_data')
      .where('unit_set', unit_set);
  },

  serializeGetRecipeIngredient(db, ingredient) {
    const returndata = {
      id: ingredient.id,
      recipe_id: ingredient.recipe_id,
      amount: ingredient.amt,
      unit_set: ingredient.unit_set,
      ing_text: xss(ingredient.ing_text),
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

  },

  serializePostRecipeIngredient(ingredient, recipe_id) {
    return {
      id: ingredient.id,
      recipe_id: recipe_id,
      amount: ingredient.amt,
      unit_set: ingredient.unit_set,
      unit_data: ingredient.unit_data,
      ing_text: xss(ingredient.ing_text),
    };
  }
};

module.exports = IngredientsService;