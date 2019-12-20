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
      .where('unit_set', unit_set)
      .first();
  },

  // async getUnitConvertData(db, unit_set) {
  //   const setData = await this.getUnitSetData(db, unit_set)


  // }

  serializeGetRecipeIngredient(db, ingredient) {
    const returnData = {
      id: ingredient.id,
      recipe_id: ingredient.recipe_id,
      amount: parseInt(ingredient.amt),
      unit_set: ingredient.unit_set,
      ing_text: xss(ingredient.ing_text),
    };
    if (!ingredient.unit_set) {
      returnData.unit_data = ingredient.unit_data;
      return returnData;
    } else {
      //Retrieve unit set data and attach to ingredient.
      return this.getUnitSetData(db, ingredient.unit_set)
        .then(setData => {
          returnData.unit_data = setData.unit_data;
          //Check if unit is convertible
          if (returnData.unit_data.cnv_to === undefined) {
            return returnData;
          } else {
            //Retrieve conversion set data and attach to ingredient.
            return this.getUnitSetData(db, returnData.unit_data.cnv_to)
              .then(setData => {
                const convertData = setData.unit_data;
                //Set conversion object
                const conversion = {
                  amount: returnData.amount * parseInt(returnData.unit_data.cnv_ratio),
                  class: convertData.class,
                  unit_plural: convertData.unit_plural,
                  unit_single: convertData.unit_single
                };
                console.log(`Conversion data for ${returnData.unit_data.unit_plural}, end and send: `, conversion);
                return returnData;
              });
          }
        });
      // .then(returndata => {
      //   return this.get
      // })
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