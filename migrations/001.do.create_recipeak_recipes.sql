--Add author ref when user table created;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE recipes (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  author TEXT NOT NULL,
  ingredients TEXT[][] NOT NULL,
  instructions TEXT NOT NULL,
  prep_time INTERVAL,
  yield INTEGER,
  date_created TIMESTAMP DEFAULT now() NOT NULL
);