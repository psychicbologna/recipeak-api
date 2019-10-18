TRUNCATE
  units_imperial,
  units_metric,
  units_approximate
  RESTART IDENTITY CASCADE;

INSERT INTO
  units_approximate (single, plural)
VALUES
  --approximate, measurable but not following a specific measurement system--
  ('x', 'x'),
  ('bar', 'bars'),
  ('bottle', 'bottles'),
  ('box', 'boxes'),
  ('bowl', 'bowls'),
  ('bunch', 'bunches'),
  ('bushel', 'bushels'),
  ('can', 'cans'),
  ('case', 'cases'),
  ('clove', 'cloves'),
  ('container', 'containers'),
  ('cube', 'cubes'),
  ('cut', 'cuts'),
  ('cutting', 'cuttings'),
  ('dash', 'dashes'),
  ('dice', 'dices'),
  ('dollop', 'dollops'),
  ('drop', 'drops'),
  ('half', 'halves'),
  ('handful', 'handfuls'),
  ('jar', 'jars'),
  ('jug', 'jugs'),
  ('leaf', 'leaves'),
  ('loaf', 'loaves'),
  ('package', 'packages'),
  ('packet', 'packets'),
  ('part', 'parts'),
  ('piece', 'pieces'),
  ('pinch', 'pinches'),
  ('pitcher', 'pitchers'),
  ('quarter', 'quarters'),
  ('scoop', 'scoops'),
  ('section', 'sections'),
  ('shake', 'shakes'),
  ('slice', 'slices'),
  ('smidgen', 'smidgens'),
  ('square', 'squares'),
  ('splash', 'splashes'),
  ('sprig', 'sprigs'),
  ('sprinkle', 'sprinkles'),
  ('tin', 'tins');


--TODO add to_imperial with conversion ratio
INSERT INTO
  units_metric (
    abbreviation,
    single,
    plural
  )
  VALUES
  ('oz', 'ounce', 'ounces'),
  ('lb', 'pound', 'pounds'),
  ('tsp', 'teaspoon', 'teaspoons'),
  ('tbsp', 'tablespoon', 'tablespoons'),
  ('floz', 'fluid ounce', 'fluid ounces'),
  ('1/4 cup', '1/4 cup', '1/4 cups'),
  ('1/3 cup', '1/3 cup', '1/3 cups'),
  ('1/2 cup', '1/2 cup', '1/2 cups'),
  ('cup', 'cup', 'cups'),
  ('pt', 'pint', 'pints'),
  ('qrt', 'quart', 'quarts'),
  ('gal', 'gallon', 'gallons');

--TODO add to_metric with conversion ratio
INSERT INTO
  units_imperial (abbreviation, single, plural)
  VALUES
  ('mg', 'milligram', 'milligrams'),
  ('g', 'gram', 'grams'),
  ('kg', 'kilogram', 'kilograms'),
  ('ml', 'milliliter', 'milliliters'),
  ('l', 'liter', 'liters'),
  ('dl', 'deciliter', 'deciliters');