BEGIN;

TRUNCATE
  users
  RESTART IDENTITY CASCADE;

COMMIT;