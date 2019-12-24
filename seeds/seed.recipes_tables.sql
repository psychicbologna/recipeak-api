BEGIN;

TRUNCATE
  ingredients,
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




INSERT INTO
  recipes (
    id,
    name,
    author,
    instructions,
    prep_time_hours,
    prep_time_minutes,
    servings,
    user_id
  )
VALUES
  (
    '38f716f2-bf5c-4ce7-baab-d52cdc47de5b',
    'Cast Iron Pizza with Fennel and sausage',
    'Claire Saffitz',
    'Place a rack in top-most position of oven; preheat to 475 degrees. Place dough on a work surface; drizzle with 1 Tbsp. oil, turning to coat. Stretch out to a 10" round and cover loosely with plastic wrap. Heat 1 Tbsp. oil in a large cast-iron skillet over medium. Cook sausage, breaking up into small pieces with a wooden spoon, until browned in spots and cooked though, 5 - 8 minutes. Transfer sausage to a small bowl. Remove skillet from heat and carefully lay dough inside (use spoon to help you extend dough all the way to the edges). Season with salt, then spread marinara over entire surface of dough. Top with mozzarella, then fennel, garlic, and cooked sausage. Drizzle with another 2 Tbsp. oil. Peek underneath the crust - the bottom should be golden brown and crisp from residual heat in the skillet. If it''s not, set over medium-low and cook until crust is golden brown, about 3 minutes. Transfer skillet to oven and bake pizza on top rack until crust is golden brown around the edges and cheese is browned in spots and bubbling all over, 10 - 14 minutes. Let cool 5 minutes, then top with red pepper flakes and basil. Sprinkle with more salt and drizzle with remaining oil.',
    0,
    35,
    7,
    '9ba39ce8-0983-4c6c-a781-fae378838c16'
  ),
  (
    '4a8d066b-9b5a-425a-9ef3-f04f364d3460',
    'Tortilla Soup',
    'Lindsay Ostrom',
    'Place all soup ingredients in the Instant Pot. Cook on high pressure for 3 minutes. Quick release steam. Tortilla Strips: Cut the tortillas into small strips. Heat the oil in a heavy pan over medium high heat. Working in batches, add tortilla strips and fry in the hot oil for a few minutes until golden and crispy. Remove with tongs, drain on paper towels, and sprinkle with salt. Serve: Stir about half of your tortilla strips into the soup and reserve the remaining half for topping. Top individual bowls with, well, everything! I highly recommend avocado, and definitely don''t forget the lime.',
    0,
    15,
    5,
    '9ba39ce8-0983-4c6c-a781-fae378838c16'
  ),
  (
    'd75013b9-efcb-447b-8f9c-21fea8813699',
    'Easy Baked Ribs',
    'Adam Cormorant',
    'Heat oven to 275 degrees Fahrenheit (135C). If the ribs still have the thin membrane covering the back of the rack, remove it. See how in the notes section below. Season both sides of the ribs with a generous amount of salt and pepper then place, meat-side up, into a large roasting pan or rimmed baking sheet. (It may be necessary to cut the ribs in half in order for them to fit into the pan). Cover the pan or baking sheet tightly with aluminum foil, and then bake until the meat falls easily from the bones, 3 to 4 hours.While the ribs bake, make the barbecue sauce. Heat the olive oil in a saucepan over medium heat. Add the onions and cook until soft and translucent, 5 to 8 minutes. Stir in the cumin and cook for an additional 30 seconds. Add the ketchup, hot chili sauce, brown sugar, and apple cider vinegar. Stir to combine, season with salt then cook for 2 minutes. Set aside in preparation for the ribs to finish roasting. Remove the ribs from the oven, discard the aluminum foil and generously brush both sides with barbecue sauce. Optional: Move an oven rack near to the top of the oven. Turn broiler to high and broil the ribs for 3-4 minutes, just until the barbecue sauce begins to caramelize. (Keep a close eye on the ribs while they broil so they the sauce does not burn.)',
    4,
    15,
    4,
    '9ba39ce8-0983-4c6c-a781-fae378838c16'
  ),
  --Claire, 'b2bb31f7-8c31-4058-8885-9404e2add1c1'
    (
    '5fc34a17-ac87-4e3c-8ea5-02a381d0cc2b',
    'Chocolate Cake',
    'Felicity Huffman',
    'Preheat oven to 350 degrees. Butter three 9-inch cake rounds. Dust with flour and tap out the excess. Mix together flour, sugar, cocoa, baking soda, baking powder, and salt in a stand mixer using a low speed until combined. Add eggs, buttermilk, warm water, oil, and vanilla. Beat on a medium speed until smooth. This should take just a couple of minutes. Divide batter among the three pans. I found that it took just over 3 cups of the batter to divide it evenly. Bake for 30-35 minutes until a toothpick inserted into the center comes out clean. Cool on wire racks for 15 minutes and then turn out the cakes onto the racks and allow to cool completely. Frost with your favorite frosting and enjoy!',
    0,
    45,
    4,
    '9ba39ce8-0983-4c6c-a781-fae378838c16'
  );

INSERT INTO
  ingredients (
    recipe_id,
    amt,
    unit_set,
    ing_text
  )
  VALUES
('38f716f2-bf5c-4ce7-baab-d52cdc47de5b', 12, 'oz', 'store-bought pizza dough'),
('38f716f2-bf5c-4ce7-baab-d52cdc47de5b', 5, 'tbsp', 'extra - virgin olive oil, divided'),
('38f716f2-bf5c-4ce7-baab-d52cdc47de5b', 8, 'oz', 'sweet Italian sausage, casings removed'),
('38f716f2-bf5c-4ce7-baab-d52cdc47de5b', 0, 'none', 'Kosher salt'),
('38f716f2-bf5c-4ce7-baab-d52cdc47de5b', 1, 'thdcup', 'prepared marinara'),
('38f716f2-bf5c-4ce7-baab-d52cdc47de5b', 3, 'qtcup', 'coarsely grated low-moisture mozzarella'),
('38f716f2-bf5c-4ce7-baab-d52cdc47de5b', .5, 'x', 'small fennel bulb, very thinly sliced'),
('38f716f2-bf5c-4ce7-baab-d52cdc47de5b', 3, 'clv', 'garlic, very thinly sliced'),
('38f716f2-bf5c-4ce7-baab-d52cdc47de5b', 0, 'none', 'Crushed red pepper flakes and torn basil leaves (for serving)'),

('4a8d066b-9b5a-425a-9ef3-f04f364d3460', 1, 'hlv', 'onion, chopped'),
('4a8d066b-9b5a-425a-9ef3-f04f364d3460', 3, 'clv', 'garlic, minced'),
('4a8d066b-9b5a-425a-9ef3-f04f364d3460', 1, 'x', 'jalapeno, seeded and minced'),
('4a8d066b-9b5a-425a-9ef3-f04f364d3460', 2, 'x', 'large sweet potatoes, peeled and diced'),
('4a8d066b-9b5a-425a-9ef3-f04f364d3460', 1, 'can', '(28 - ounce per can) fire roasted crushed tomatoes'),
('4a8d066b-9b5a-425a-9ef3-f04f364d3460', 6, 'cup', 'vegetable broth'),
('4a8d066b-9b5a-425a-9ef3-f04f364d3460', 1, 'tbsp', 'chili powder'),
('4a8d066b-9b5a-425a-9ef3-f04f364d3460', 2, 'x', 'chipotle peppers in adobo (canned), minced'),
('4a8d066b-9b5a-425a-9ef3-f04f364d3460', 1, 'cup', 'sweet corn (optional)'),

( 'd75013b9-efcb-447b-8f9c-21fea8813699', 2.5, 'lb', 'lbs baby back pork ribs'),
( 'd75013b9-efcb-447b-8f9c-21fea8813699', 0, 'none', 'Salt and black pepper'),
( 'd75013b9-efcb-447b-8f9c-21fea8813699', 1, 'tbsp', 'olive oil'),
( 'd75013b9-efcb-447b-8f9c-21fea8813699', 1, 'qtcup', 'finely diced onion'),
( 'd75013b9-efcb-447b-8f9c-21fea8813699', .5, 'tsp', 'tsp ground cumin'),
( 'd75013b9-efcb-447b-8f9c-21fea8813699', 1, 'hcup', 'ketchup'),
( 'd75013b9-efcb-447b-8f9c-21fea8813699', 1,'tbsp', 'hot chili sauce'),
( 'd75013b9-efcb-447b-8f9c-21fea8813699', 2,'tbsp', 'light brown sugar'),
( 'd75013b9-efcb-447b-8f9c-21fea8813699', 1, 'tbsp', 'apple cider vinegar'),

( '5fc34a17-ac87-4e3c-8ea5-02a381d0cc2b', 0, 'none', 'butter and flour for coating and dusting the cake pan'),
( '5fc34a17-ac87-4e3c-8ea5-02a381d0cc2b', 3, 'cup', 'all-purpose flour'),
( '5fc34a17-ac87-4e3c-8ea5-02a381d0cc2b', 3, 'cup', 'granulated sugar'),
( '5fc34a17-ac87-4e3c-8ea5-02a381d0cc2b', 1, 'hcup', 'unsweetened cocoa powder'),
( '5fc34a17-ac87-4e3c-8ea5-02a381d0cc2b', 1, 'tbsp', 'baking soda'),
( '5fc34a17-ac87-4e3c-8ea5-02a381d0cc2b', 1, 'tsp', '1/2 teaspoons baking powder'),
( '5fc34a17-ac87-4e3c-8ea5-02a381d0cc2b', 1, 'tsp', '1/2 teaspoons salt'),
( '5fc34a17-ac87-4e3c-8ea5-02a381d0cc2b', 4, 'x', 'large eggs'),
( '5fc34a17-ac87-4e3c-8ea5-02a381d0cc2b', 1, 'hcup', 'buttermilk'),
( '5fc34a17-ac87-4e3c-8ea5-02a381d0cc2b', 1, 'hcup', 'warm water'),
( '5fc34a17-ac87-4e3c-8ea5-02a381d0cc2b', 1, 'hcup', 'vegetable oil'),
( '5fc34a17-ac87-4e3c-8ea5-02a381d0cc2b', 2, 'tsp', 'vanilla extract');
 
COMMIT;