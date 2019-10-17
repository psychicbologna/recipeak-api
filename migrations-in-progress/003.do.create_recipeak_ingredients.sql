BEGIN;

CREATE TYPE unit_class AS ENUM (
  'generic',
  'us',
  'metric'
)

CREATE TABLE IF NOT EXISTS ingredients_units (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  unit_name TEXT NOT NULL, 
  abbreviation TEXT NOT NULL,
  unit_class unit_class,
  conversion FLOAT
);

-- TODO: Populate the table! All generic units will have a 1 to 1 conversion, all metric/us units must have conversion multipliers.
INSERT INTO ingredients_units (unit_name,)
  VALUES
  ('None', '', 'generic', 1),
  ('Basic Unit', 'x', 'generic', 1);


CREATE TABLE IF NOT EXISTS ingredients (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  generic_amt FLOAT,
  metric_amt FLOAT,
  us_amt FLOAT,  
  unit REFERENCES ingredients_units,
  ingredient TEXT NOT NULL
);

ALTER TABLE recipes
  ADD COLUMN
    user_id uuid REFERENCES users(id)
    ON DELETE SET NULL;

COMMIT;