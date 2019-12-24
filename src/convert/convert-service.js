const UnitsService = require('../units/units-service'),
  helpers = require('../helpers/helpers');

const ConvertService = {

  /**
  * Creates a conversion object that includes unit data info for more complex frontend functionality. Used to ship a recipe's ingredients with their
  * conversions and quickly generate one when an ingredient is edited. Handling conversion entirely in backend will allow for more scalable conversion
  * features in the future (eg. fluid vs. dry, new units of measurement, different measuring systems).
  */

  createConversion(db, amount, unit_set) {
    UnitsService.getUnitSetData(db, unit_set)
      .then(setData => {
        //Pull unit data from response.
        const unit_data = setData.unit_data;
        //Check if unit is convertible
        if (unit_data.cnv_to === undefined) {
          return null;
        } else {
          //Retrieve conversion set data and attach to ingredient.
          return UnitsService.getUnitSetData(db, unit_data.cnv_to)
            .then(setData => {
              const convertData = setData.unit_data;
              //Set conversion object
              const conversion = helpers.createConversion(amount, unit_data.cnv_ratio, convertData);
              console.log(conversion);
              return conversion;
            });
        }
      });
  }
};

module.exports = ConvertService;