CREATE TABLE IF NOT EXISTS recipes (
  id uuid DEFAULT uuid_generate_v4() UNIQUE,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  author TEXT NOT NULL,
  instructions TEXT NOT NULL,
  prep_time INTERVAL,
  servings INTEGER,
  date_created TIMESTAMP DEFAULT now() NOT NULL,
  date_modified TIMESTAMP DEFAULT null,
  PRIMARY KEY (id, user_id)
);