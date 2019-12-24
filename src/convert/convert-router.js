const express = require('express'),
  ConvertService = require('../convert/convert-service'),
  jsonBodyParser = express.json();


const convertRouter = express.Router();

convertRouter
  .route('/conversion')
  //Creates and sends a conversion object.
  .get(jsonBodyParser, (req, res, next) => {
    const { amount, unit_set } = req.body;

    ConvertService.createConversion(req.app.get('db'), amount, unit_set)
      .then(conversion => {
        res.status(200).json(conversion);
      })
      .catch(next);
  });

convertRouter
  //Given an amount and unit set, returns a converted number. In a future build with more variations on unit conversion, this will need to be more explicit about different units.
  .route('/:amount/:unitSet')
  .get((req, res, next) => {
    const { amount, unitSet } = req.params;

    ConvertService.createConversion(req.app.get('db'), amount, unitSet)
      .then(conversion => {
        res.status(200).json(conversion.amount);
      })
      .catch(next);
  });

module.exports = convertRouter;