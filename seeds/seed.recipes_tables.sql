BEGIN;

TRUNCATE
  recipes,
  RESTART IDENTITY CASCADE;

INSERT INTO
  recipes (
    name,
    author,
    instructions,
    prep_time,
    servings,
    user_id,
    recipe_public
  )
VALUES
  (
    'Alex''s Cast Iron Pizza with Fennel and sausage',
    'Claire Saffitz',
    'Place a rack in top-most position of oven; preheat to 475°. Place dough on a work surface; drizzle with 1 Tbsp. oil, turning to coat. Stretch out to a 10" round and cover loosely with plastic wrap. Heat 1 Tbsp. oil in a large cast-iron skillet over medium. Cook sausage, breaking up into small pieces with a wooden spoon, until browned in spots and cooked though, 5–8 minutes. Transfer sausage to a small bowl. Remove skillet from heat and carefully lay dough inside (use spoon to help you extend dough all the way to the edges). Season with salt, then spread marinara over entire surface of dough. Top with mozzarella, then fennel, garlic, and cooked sausage. Drizzle with another 2 Tbsp. oil. Peek underneath the crust—the bottom should be golden brown and crisp from residual heat in the skillet. If it’s not, set over medium-low and cook until crust is golden brown, about 3 minutes. Transfer skillet to oven and bake pizza on top rack until crust is golden brown around the edges and cheese is browned in spots and bubbling all over, 10–14 minutes. Let cool 5 minutes, then top with red pepper flakes and basil. Sprinkle with more salt and drizzle with remaining 1 Tbsp. oil.',
    '35 minutes',
    7,
    '9ba39ce8-0983-4c6c-a781-fae378838c16',
    TRUE
  ),
    (
    'Alex''s PRIVATE Cast Iron Pizza with Fennel and sausage',
    'Claire Saffitz',
    '{"12 oz store - bought pizza dough", "5 tbsp extra - virgin olive oil, divided", "8 oz. sweet Italian sausage, casings removed", "Kosher salt", "⅓ cup prepared marinara", "¾ cup coarsely grated low-moisture mozzarella", "½ small fennel bulb, very thinly sliced", "3 garlic cloves, very thinly sliced", "Crushed red pepper flakes and torn basil leaves (for serving)"}',
    'Place a rack in top-most position of oven; preheat to 475°. Place dough on a work surface; drizzle with 1 Tbsp. oil, turning to coat. Stretch out to a 10" round and cover loosely with plastic wrap. Heat 1 Tbsp. oil in a large cast-iron skillet over medium. Cook sausage, breaking up into small pieces with a wooden spoon, until browned in spots and cooked though, 5–8 minutes. Transfer sausage to a small bowl. Remove skillet from heat and carefully lay dough inside (use spoon to help you extend dough all the way to the edges). Season with salt, then spread marinara over entire surface of dough. Top with mozzarella, then fennel, garlic, and cooked sausage. Drizzle with another 2 Tbsp. oil. Peek underneath the crust—the bottom should be golden brown and crisp from residual heat in the skillet. If it’s not, set over medium-low and cook until crust is golden brown, about 3 minutes. Transfer skillet to oven and bake pizza on top rack until crust is golden brown around the edges and cheese is browned in spots and bubbling all over, 10–14 minutes. Let cool 5 minutes, then top with red pepper flakes and basil. Sprinkle with more salt and drizzle with remaining 1 Tbsp. oil.',
    '35 minutes',
    7,
    '9ba39ce8-0983-4c6c-a781-fae378838c16',
    FALSE
  ),
  (
    'Alex''sTortilla Soup',
    'Lindsay Ostrom',
    '{ "half an onion, chopped ", "3 cloves garlic, minced", "1 jalapeno, seeded and minced ", "2 large sweet potatoes, peeled and diced ", "1 28 - ounce can fire roasted crushed tomatoes", "6 cups vegetable broth ", "1 tablespoon chili powder", "2 chipotle peppers in adobo (canned), minced, or a dash of chipotle powder", "1 – 2 cups sweet corn (optional)"}',
    'Place all soup ingredients in the Instant Pot. Cook on high pressure for 3 minutes. Quick release steam. Tortilla Strips: Cut the tortillas into small strips. Heat the oil in a heavy pan over medium high heat. Working in batches, add tortilla strips and fry in the hot oil for a few minutes until golden and crispy. Remove with tongs, drain on paper towels, and sprinkle with salt. Serve: Stir about half of your tortilla strips into the soup and reserve the remaining half for topping. Top individual bowls with… well… everything! I highly recommend avocado, and definitely don’t forget the lime.',
    '15 minutes',
    5,
    '9ba39ce8-0983-4c6c-a781-fae378838c16',
    TRUE
  ),
  (
    'Alex''s Easy Baked Ribs',
    'Adam',
    '{"2 to 2 1/2 lbs baby back pork ribs", "Salt and black pepper", "1 tbsp olive oil", "1/4 cup finely diced onion", "1/2 tsp ground cumin", "1/2 cup ketchup", "1 tbsp hot chili sauce", "2 tbsp light brown sugar", "1 tbsp apple cider vinegar", "Salt and ground pepper, to taste"}',
    'Heat oven to 275 degrees Fahrenheit (135C). If the ribs still have the thin membrane covering the back of the rack, remove it. See how in the notes section below. Season both sides of the ribs with a generous amount of salt and pepper then place, meat-side up, into a large roasting pan or rimmed baking sheet. (It may be necessary to cut the ribs in half in order for them to fit into the pan). Cover the pan or baking sheet tightly with aluminum foil, and then bake until the meat falls easily from the bones, 3 to 4 hours.While the ribs bake, make the barbecue sauce. Heat the olive oil in a saucepan over medium heat. Add the onions and cook until soft and translucent, 5 to 8 minutes. Stir in the cumin and cook for an additional 30 seconds. Add the ketchup, hot chili sauce, brown sugar, and apple cider vinegar. Stir to combine, season with salt then cook for 2 minutes. Set aside in preparation for the ribs to finish roasting. Remove the ribs from the oven, discard the aluminum foil and generously brush both sides with barbecue sauce. Optional: Move an oven rack near to the top of the oven. Turn broiler to high and broil the ribs for 3-4 minutes, just until the barbecue sauce begins to caramelize. (Keep a close eye on the ribs while they broil so they the sauce does not burn.)',
    '4 hours 15 minutes',
    4,
    '9ba39ce8-0983-4c6c-a781-fae378838c16',
    TRUE
  );
  --Claire, 'b2bb31f7-8c31-4058-8885-9404e2add1c1'
    (
    'Claire''s Chocolate Cake',
    'Not Adam',
    '{"2 to 2 1/2 lbs baby back pork ribs", "Salt and black pepper", "1 tbsp olive oil", "1/4 cup finely diced onion", "1/2 tsp ground cumin", "1/2 cup ketchup", "1 tbsp hot chili sauce", "2 tbsp light brown sugar", "1 tbsp apple cider vinegar", "Salt and ground pepper, to taste"}',
    'Heat oven to 275 degrees Fahrenheit (135C). If the ribs still have the thin membrane covering the back of the rack, remove it. See how in the notes section below. Season both sides of the ribs with a generous amount of salt and pepper then place, meat-side up, into a large roasting pan or rimmed baking sheet. (It may be necessary to cut the ribs in half in order for them to fit into the pan). Cover the pan or baking sheet tightly with aluminum foil, and then bake until the meat falls easily from the bones, 3 to 4 hours.While the ribs bake, make the barbecue sauce. Heat the olive oil in a saucepan over medium heat. Add the onions and cook until soft and translucent, 5 to 8 minutes. Stir in the cumin and cook for an additional 30 seconds. Add the ketchup, hot chili sauce, brown sugar, and apple cider vinegar. Stir to combine, season with salt then cook for 2 minutes. Set aside in preparation for the ribs to finish roasting. Remove the ribs from the oven, discard the aluminum foil and generously brush both sides with barbecue sauce. Optional: Move an oven rack near to the top of the oven. Turn broiler to high and broil the ribs for 3-4 minutes, just until the barbecue sauce begins to caramelize. (Keep a close eye on the ribs while they broil so they the sauce does not burn.)',
    '4 hours 15 minutes',
    4,
    'b2bb31f7-8c31-4058-8885-9404e2add1c1',
    TRUE
  );

INSERT INTO
  ingredients (
    id,
    amt,
    unit_type,
    unit_id,
    ingredient
  )
  ( uuid_generate_v4(), 12, 'imperial', '12 oz store - bought pizza dough')
  ( uuid_generate_v4(), 5, ' tbsp extra - virgin olive oil, divided')
  ( uuid_generate_v4(), 8, '8 oz. sweet Italian sausage, casings removed')
  ( uuid_generate_v4(), 1, 'Kosher salt')
  ( uuid_generate_v4(), 1, '⅓ cup prepared marinara')
  ( uuid_generate_v4(), '¾ cup coarsely grated low-moisture mozzarella')
  ( uuid_generate_v4(), '½ small fennel bulb, very thinly sliced')
  ( uuid_generate_v4(), '3 garlic cloves, very thinly sliced')
  ( uuid_generate_v4(), 'Crushed red pepper flakes and torn basil leaves (for serving)')

COMMIT;