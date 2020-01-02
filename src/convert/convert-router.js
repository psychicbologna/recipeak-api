const express = require('express'),
  ConvertService = require('../convert/convert-service');

const convertRouter = express.Router();

convertRouter
  //Given an amount and unit set, returns a converted number. In a future build with more variations on unit conversion, this will need to be more explicit about different units.
  .route('/:amount/:unitSet')
  .get((req, res, next) => {
    const { amount, unitSet } = req.params;
    ConvertService.createConversion(req.app.get('db'), amount, unitSet)
      .then(conversion => {
        res.status(200).json(conversion);
      })
      .catch(next);
  });

module.exports = convertRouter;