CREATE TABLE recipes (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  ingredients TEXT[][] NOT NULL,
  instructions TEXT NOT NULL
)