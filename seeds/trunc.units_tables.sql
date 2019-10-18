BEGIN;

IF EXISTS TRUNCATE
  units_imperial,
  units_metric,
  units_approximate
  RESTART IDENTITY CASCADE;

COMMIT;