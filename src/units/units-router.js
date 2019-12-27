const express = require('express'),
  UnitsService = require('./units-service');

const unitsRouter = express.Router()

//Retrieves a sorted list of units.
unitsRouter
  .route('/')
  .get((req, res, next) => {
    UnitsService.getUnits(req.app.get('db'))
      .then(units => {
        //Sorts units into groups by class before deploying.
        const sortedUnits = UnitsService.unitsSorter(units);
        res.json(sortedUnits);
      })
      .catch(next);
  });

//Given a unit set, returns unit data.
unitsRouter
  .route('/:unit_set')
  .get((req, res, next) => {
    const { unit_set } = req.params;
    UnitsService.getUnitSetData(req.app.get('db'), unit_set)
      .then(unitData => {
        const unit_plural = unitData.unit_data.unit_plural,
          unit_single = unitData.unit_data.unit_single,
          unit_class = unitData.unit_data.class;
        res.json({ class: unit_class, unit_plural, unit_single });
      })
      .catch(next);
  });

module.exports = unitsRouter;