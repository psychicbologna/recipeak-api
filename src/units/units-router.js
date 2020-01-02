const express = require('express'),
  UnitsService = require('./units-service');

const unitsRouter = express.Router();

//Retrieves a sorted list of units.
unitsRouter
  .route('/')
  .get((req, res, next) => {
    return UnitsService.getUnits(req.app.get('db'))
      .then(units => {
        if (!units.length)
          return res.status(404).json({
            error: `Sorry, the units don't exist`
          });
        //Sorts units into groups by class before deploying.
        try {
          const sortedUnits = UnitsService.unitsSorter(units);
          return res.json(sortedUnits);
        } catch (error) {
          next(error);
        }
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

        if (!unitData)
          return res.status(404).json({
            error: `Sorry, that unit doesn't exist`
          });

        const unit_plural = unitData.unit_data.unit_plural,
          unit_single = unitData.unit_data.unit_single,
          unit_class = unitData.unit_data.class;
        res.json({ class: unit_class, unit_plural, unit_single });
      })
      .catch(next);
  });

module.exports = unitsRouter;