BEGIN;

DROP TABLE
  ingredient_unit,
  ingredients,
  units_imperial,
  units_metric,
  units_approximate;

DROP TYPE unit_types;

COMMIT;