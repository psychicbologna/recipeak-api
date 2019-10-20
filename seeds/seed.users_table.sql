BEGIN;

TRUNCATE
  recipes,
  users
  RESTART IDENTITY CASCADE;

INSERT INTO users (id, first_name, last_name, username, password)
  VALUES
  ('9ba39ce8-0983-4c6c-a781-fae378838c16', 'Alex', 'Admin', 'alex', '$2a$12$oX8ny/4AnHSJk3b5xZ4bs.i3EPMd4VuYXpLLKSZea2EAa.1AiU5Fy'), --password
  ('b2bb31f7-8c31-4058-8885-9404e2add1c1', 'Claire', 'Saffitz', 'csaffitz01', '$2a$12$zUKnDQ7uwjVLH0956U/r1eTH19vj9AiSPjIyEz9U4u/0FMn7ntgGq'), --aterriblepassword
  ('e58a7042-ecdf-472e-8e3a-1367192f26d6', 'Lindsay', 'Ostrom', 'lOstrom02', '$2a$12$TUTbtWyfoREAcIgbg0YT1eM.sLtBEdVY1K9hov1XnCWhcXJ3Ui9gC'), --anotherterriblepassword
  ('922fc3ba-cdc1-4423-a663-e24284e6d537', 'Adam', '', 'adam03', '$2a$12$8drWhlfmnJmffMEgcDFTIeyabVX57UWx6.gvd7jNcpwpCdEr1wW7S'), --wordpasspassword
  ('b79db978-93ef-46e0-99a4-0dfc1041ccc9', 'Julia', 'Child', 'jChild04', '$2a$12$5M3exC3OI.5lJ6Uf5fuvNOMl3quQ22seLTCI4EiluIgg4jlE5XfOy'), --bonjour
  ('d771c9da-0ee2-4292-be2e-5ec6ac0cbfc1', 'Guy', 'Fieri', 'fireandfury05', '$2a$12$X35yRcV4k9Iozkr.TCJQROBAxdWF6WgEty4tsM9bPLU36a/6IkbAO'), --flavortown
  ('1c1bf9bf-d3e4-48fd-bf17-1f16518a740b', 'Anthony', '', 'bourdom06', '$2a$12$GTxViqVA6vZO/MU/4shsWuDGqR/FCtwQ.MSkpPo/3sH.BsZUKy5A6'); --thisbeautifulworld

COMMIT;