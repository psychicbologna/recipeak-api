--Add author ref when user table created;

CREATE TABLE recipes (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  author TEXT NOT NULL,
  ingredients TEXT[][] NOT NULL,
  instructions TEXT NOT NULL,
  prep_time INTERVAL,
  yield INTEGER
);