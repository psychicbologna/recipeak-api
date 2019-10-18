BEGIN;

ALTER TABLE recipes
  ADD COLUMN ingredients TEXT[][] NOT NULL,

DROP TABLE
  ingredients,
  units_imperial,
  units_metric,
  units_approximate
COMMIT;