const helpers = {
  //Contains the preset conversion data for a defined ingredient.
  createConversion(amount, ratio, convertData) {
    console.log(amount, ratio=1, convertData);
    return {
      amount: (amount * parseFloat(ratio).toFixed(3)), //Round to 3 decimal places.
      class: convertData.class,
      unit_abbr: convertData.unit_abbr,
      unit_plural: convertData.unit_plural,
      unit_single: convertData.unit_single
    };
  }
};

module.exports = helpers;