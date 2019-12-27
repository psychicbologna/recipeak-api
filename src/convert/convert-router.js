const express = require('express'),
  ConvertService = require('../convert/convert-service');

const convertRouter = express.Router();

// convertRouter
// .route('/conversion')
// //Takes amount and unit_set from request, responds with a conversion object.
// .get(jsonBodyParser, (req, res, next) => {
//   let { amount, unit_set } = req.body;

//   amount = amount.parseFloat(amount);

//   ConvertService.createConversion(req.app.get('db'), amount, unit_set)
//     .then(conversion => {
//       res.status(200).json(conversion);
//     })
//     .catch(next);
// });

convertRouter
  //Given an amount and unit set, returns a converted number. In a future build with more variations on unit conversion, this will need to be more explicit about different units.
  .route('/:amount/:unitSet')
  .get((req, res, next) => {
    const { amount, unitSet } = req.params;
    ConvertService.createConversion(req.app.get('db'), amount, unitSet)
      .then(conversion => {
        console.log('Conversion: ', conversion);
        res.status(200).json(conversion);
      })
      .catch(next);
  });

module.exports = convertRouter;