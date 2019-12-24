const xss = require('xss');
const parse = require('postgres-interval');
const UnitsService = require('../units/units-service');
const helpers = require('../helpers/helpers');

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

  serializeGetRecipeIngredient(db, ingredient) {
    const returnData = {
      id: ingredient.id,
      recipe_id: ingredient.recipe_id,
      amount: ingredient.amt,
      unit_set: ingredient.unit_set,
      ing_text: xss(ingredient.ing_text),
    };
    if (ingredient.unit_set === 'custom') {
      returnData.unit_data = ingredient.unit_data;
      return returnData;
    } else {
      //Retrieve unit set data and attach to ingredient.
      return UnitsService.getUnitSetData(db, ingredient.unit_set)
        .then(setData => {
          returnData.unit_data = setData.unit_data;
          //Check if unit is convertible
          if (returnData.unit_data.cnv_to === undefined) {
            return returnData;
          } else {
            //Retrieve conversion set data and attach to ingredient.
            return UnitsService.getUnitSetData(db, returnData.unit_data.cnv_to)
              .then(setData => {
                
                const convertData = setData.unit_data;
                //Set conversion object
                const conversion = helpers.createConversion(returnData.amount, returnData.unit_data.cnv_ratio, convertData);
                //Attach conversion to ingredient
                returnData.conversion = conversion;
                delete [returnData.unit_data.cnv_to, returnData.unit_data.cnv_ratio];
                return returnData;
              });
          }
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