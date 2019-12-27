const express = require('express'),
  UnitsService = require('./units-service');

const unitsRouter = express.Router()

unitsRouter
  .route('/')
  .get((req, res, next) => {
    UnitsService.getUnits(req.app.get('db'))
      .then( units => {
        //Sorts units into groups by class before deploying.
        const sortedUnits = UnitsService.unitsSorter(units);
        res.json(sortedUnits);
      })
      .catch(next);
  });

module.exports = unitsRouter;