BEGIN;

TRUNCATE
  recipes,
  users
  RESTART IDENTITY CASCADE;

COMMIT;