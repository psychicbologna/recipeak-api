CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name TEXT NOT NULL,
  last_name TEXT,
  username TEXT NOT NULL,
  date_created TIMESTAMP DEFAULT now() NOT NULL
  password TEXT NOT NULL
);

ALTER TABLE recipes
  ADD COLUMN
    user_id uuid REFERENCES users(id)
    ON DELETE SET NULL;