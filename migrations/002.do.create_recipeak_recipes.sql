CREATE TABLE IF NOT EXISTS recipes (
  id uuid DEFAULT uuid_generate_v4() UNIQUE,
  user_id uuid REFERENCES users(id)
  ON DELETE CASCADE,
  name TEXT NOT NULL,
  author TEXT,
  instructions TEXT NOT NULL,
  prep_time_hours INTEGER,
  prep_time_minutes INTEGER,
  servings INTEGER,
  date_created TIMESTAMP DEFAULT now() NOT NULL,
  PRIMARY KEY (id, user_id)
);