BEGIN;

TRUNCATE
  recipes,
  users
  RESTART IDENTITY CASCADE;

INSERT INTO users (id, first_name, last_name, username, password)
  VALUES
  ('9ba39ce8-0983-4c6c-a781-fae378838c16', 'Alex', 'Admin', 'alex', 'password'),
  ('b2bb31f7-8c31-4058-8885-9404e2add1c1', 'Claire', 'Saffitz', 'csaffitz01', 'aterriblepassword'),
  ('e58a7042-ecdf-472e-8e3a-1367192f26d6', 'Lindsay', 'Ostrom', 'lOstrom02', 'anotherterriblepassword'),
  ('922fc3ba-cdc1-4423-a663-e24284e6d537', 'Adam', '', 'adam03', 'wordpasspassword'),
  ('b79db978-93ef-46e0-99a4-0dfc1041ccc9', 'Julia', 'Child', 'jChild04', 'bonjour'),
  ('d771c9da-0ee2-4292-be2e-5ec6ac0cbfc1', 'Guy', 'Fieri', 'fireandfury05', 'flavortown'),
  ('1c1bf9bf-d3e4-48fd-bf17-1f16518a740b', 'Anthony', '', 'bourdom06', 'thisbeautifulworld');

COMMIT;