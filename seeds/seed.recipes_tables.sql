BEGIN;

TRUNCATE
  ingredients,
  units,
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
  units (unit_set, unit_data)
VALUES
  ('none', '{"unit_single":"", "unit_plural":""}'),
  ('x','{"unit_single":"x", "unit_plural":"x"}'),
  --approximate, measurable but not following a specific measurement system--
  ('apprx_bar','{"unit_single":"bar", "unit_plural":"bars"}'),
  ('apprx_btl','{"unit_single":"bottle", "unit_plural":"bottles"}'),
  ('apprx_bx','{"unit_single":"box", "unit_plural":"boxes"}'),
  ('apprx_bowl','{"unit_single":"bowl", "unit_plural":"bowls"}'),
  ('apprx_bnch','{"unit_single":"bunch", "unit_plural":"bunches"}'),
  ('apprx_bush','{"unit_single":"bushel", "unit_plural":"bushels"}'),
  ('apprx_can','{"unit_single":"can", "unit_plural":"cans"}'),
  ('apprx_cs','{"unit_single":"case", "unit_plural":"cases"}'),
  ('apprx_clv','{"unit_single":"clove", "unit_plural":"cloves"}'),
  ('apprx_ct','{"unit_single":"container", "unit_plural":"containers"}'),
  ('apprx_cb','{"unit_single":"cube", "unit_plural":"cubes"}'),
  ('apprx_cut','{"unit_single":"cut", "unit_plural":"cuts"}'),
  ('apprx_cting','{"unit_single":"cutting", "unit_plural":"cuttings"}'),
  ('apprx_db','{"unit_single":"dab", "unit_plural":"dabs"}'),
  ('apprx_dsh','{"unit_single":"dash", "unit_plural":"dashes"}'),
  ('apprx_dc','{"unit_single":"dice", "unit_plural":"dices"}'),
  ('apprx_dolp','{"unit_single":"dollop", "unit_plural":"dollops"}'),
  ('apprx_drp','{"unit_single":"drop", "unit_plural":"drops"}'),
  ('apprx_gls', '{"unit_single":"glass", "unit_plural":"glasses"}'),
  ('apprx_hlv', '{"unit_single":"half", "unit_plural":"halves"}'),
  ('apprx_hnd','{"unit_single":"handful", "unit_plural":"handfuls"}'),
  ('apprx_jr','{"unit_single":"jar", "unit_plural":"jars"}'),
  ('apprx_jg','{"unit_single":"jug", "unit_plural":"jugs"}'),
  ('apprx_lef','{"unit_single":"leaf", "unit_plural":"leaves"}'),
  ('apprx_lof','{"unit_single":"loaf", "unit_plural":"loaves"}'),
  ('apprx_pkg','{"unit_single":"package", "unit_plural":"packages"}'),
  ('apprx_pkt','{"unit_single":"packet", "unit_plural":"packets"}'),
  ('apprx_prt','{"unit_single":"part", "unit_plural":"parts"}'),
  ('apprx_pce','{"unit_single":"piece", "unit_plural":"pieces"}'),
  ('apprx_pnch','{"unit_single":"pinch", "unit_plural":"pinches"}'),
  ('apprx_pchr','{"unit_single":"pitcher", "unit_plural":"pitchers"}'),
  ('apprx_qtr','{"unit_single":"quarter", "unit_plural":"quarters"}'),
  ('apprx_scp','{"unit_single":"scoop", "unit_plural":"scoops"}'),
  ('apprx_sec','{"unit_single":"section", "unit_plural":"sections"}'),
  ('apprx_shk','{"unit_single":"shake", "unit_plural":"shakes"}'),
  ('apprx_sht','{"unit_single":"shot", "unit_plural":"shots"}'),
  ('apprx_slc','{"unit_single":"slice", "unit_plural":"slices"}'),
  ('apprx_smdg','{"unit_single":"smidgen", "unit_plural":"smidgens"}'),
  ('apprx_sqr','{"unit_single":"square", "unit_plural":"squares"}'),
  ('apprx_splsh','{"unit_single":"splash", "unit_plural":"splashes"}'),
  ('apprx_sprg','{"unit_single":"sprig", "unit_plural":"sprigs"}'),
  ('apprx_sprnk','{"unit_single":"sprinkle", "unit_plural":"sprinkles"}'),
  ('apprx_tin','{"unit_single":"tin", "unit_plural":"tins"}'),
--TODO add conversion_ratio & conversion_unit 
('us_oz'    ,'{"class":"US", "cnv_to":"met_g",  "cnv_ratio":"28.3495", "unit_abbr":"oz"     , "unit_single":"ounce"      ,"unit_plural":"ounces", "lb_ratio":"16"}'),
('us_lb'    ,'{"class":"US", "cnv_to":"met_kg", "cnv_ratio":".453592", "unit_abbr":"lb"     , "unit_single":"pound"      ,"unit_plural":"pounds"}'),
('us_tsp'   ,'{"class":"US", "cnv_to":"met_g",  "cnv_ratio":"10.5",    "unit_abbr":"tsp"    , "unit_single":"teaspoon"   ,"unit_plural":"teaspoons", "spn_ratio":"3"}'),
('us_tbsp'  ,'{"class":"US", "cnv_to":"met_g",  "cnv_ratio":"14.3",    "unit_abbr":"tbsp"   , "unit_single":"tablespoon" ,"unit_plural":"tablespoons", "cup_ratio":"16"}'),
('us_floz'  ,'{"class":"US", "cnv_to":"met_ml", "cnv_ratio":"29.5735", "unit_abbr":"floz"   , "unit_single":"fluid ounce","unit_plural":"fluid ounces", "cup_ratio":"0.125"}'),
('us_qtcup' ,'{"class":"US", "cnv_to":"met_ml", "cnv_ratio":"59.14706","unit_abbr":"1/4 cup", "unit_single":"1/4 cup"    ,"unit_plural":"1/4 cups",    "cup_ratio":"4", "hcup_ratio":"2"}'),
('us_thdcup','{"class":"US", "cnv_to":"met_ml", "cnv_ratio":"78.8627", "unit_abbr":"1/3 cup", "unit_single":"1/3 cup"    ,"unit_plural":"1/3 cups",    "cup_ratio":"3"}'),
('us_hcup'  ,'{"class":"US", "cnv_to":"met_ml", "cnv_ratio":"118.294", "unit_abbr":"1/2 cup", "unit_single":"1/2 cup"    ,"unit_plural":"1/2 cups",    "cup_ratio":"2"}'),
('us_cup'   ,'{"class":"US", "cnv_to":"met_ml", "cnv_ratio":"236.588", "unit_abbr":"cup"    , "unit_single":"cup"        ,"unit_plural":"cups",        "pt_ratio":"2"}'),
('us_pt'    ,'{"class":"US", "cnv_to":"met_ml", "cnv_ratio":"473.176", "unit_abbr":"pt"     , "unit_single":"pint"       ,"unit_plural":"pints",       "qrt_ratio":"2"}'),
('us_qrt'   ,'{"class":"US", "cnv_to":"met_ml", "cnv_ratio":"946.353", "unit_abbr":"qrt"    , "unit_single":"quart"      ,"unit_plural":"quarts",      "gal_ratio":"4", "hg_ratio":"2"}'),
('us_hgal'  ,'{"class":"US", "cnv_to":"met_ml", "cnv_ratio":"1892.71", "unit_abbr":"hgal"   , "unit_single":"half gallon","unit_plural":"half gallons","gal_ratio":"2"}'),
('us_gal'   ,'{"class":"US", "cnv_to":"met_l",  "cnv_ratio":"3.78541", "unit_abbr":"gal"    , "unit_single":"gallon"     ,"unit_plural":"gallons"}'),
--TODO add conversion_ratio & conversion_unit
('met_mg','{"class":"Metric", "cnv_to":"us_oz", "cnv_ratio":".035274", "unit_abbr":"mg","unit_single":"milligram" ,"unit_plural":"milligrams", "g_ratio":"1000"}'),
('met_g' ,'{"class":"Metric", "cnv_to":"us_oz", "cnv_ratio":".035274", "unit_abbr":"g" ,"unit_single":"gram"      ,"unit_plural":"grams"}'),
('met_kg','{"class":"Metric", "cnv_to":"us_lb", "cnv_ratio":"2.20462", "unit_abbr":"kg","unit_single":"kilogram"  , "unit_plural":"kilograms"}'),
('met_ml','{"class":"Metric", "cnv_to":"us_floz", "cnv_ratio":".033814", "unit_abbr":"ml","unit_single":"milliliter", "unit_plural":"milliliters"}'),
('met_l' ,'{"class":"Metric", "cnv_to":"us_gal", "cnv_ratio":"2.20462", "unit_abbr":"l" ,"unit_single":"liter"     , "unit_plural":"liters"}');

INSERT INTO
  recipes (
    id,
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
    '38f716f2-bf5c-4ce7-baab-d52cdc47de5b',
    'Alex''s Cast Iron Pizza with Fennel and sausage',
    'Claire Saffitz',
    'Place a rack in top-most position of oven; preheat to 475°. Place dough on a work surface; drizzle with 1 Tbsp. oil, turning to coat. Stretch out to a 10" round and cover loosely with plastic wrap. Heat 1 Tbsp. oil in a large cast-iron skillet over medium. Cook sausage, breaking up into small pieces with a wooden spoon, until browned in spots and cooked though, 5–8 minutes. Transfer sausage to a small bowl. Remove skillet from heat and carefully lay dough inside (use spoon to help you extend dough all the way to the edges). Season with salt, then spread marinara over entire surface of dough. Top with mozzarella, then fennel, garlic, and cooked sausage. Drizzle with another 2 Tbsp. oil. Peek underneath the crust—the bottom should be golden brown and crisp from residual heat in the skillet. If it’s not, set over medium-low and cook until crust is golden brown, about 3 minutes. Transfer skillet to oven and bake pizza on top rack until crust is golden brown around the edges and cheese is browned in spots and bubbling all over, 10–14 minutes. Let cool 5 minutes, then top with red pepper flakes and basil. Sprinkle with more salt and drizzle with remaining 1 Tbsp. oil.',
    '35 minutes',
    7,
    '9ba39ce8-0983-4c6c-a781-fae378838c16',
    TRUE
  ),
    (
    '4783af4f-3766-48f4-9d43-40566189052a',
    'Alex''s PRIVATE Cast Iron Pizza with Fennel and sausage',
    'Secret Claire Saffitz',
    'Place a rack in top-most position of oven; preheat to 475°. Place dough on a work surface; drizzle with 1 Tbsp. oil, turning to coat. Stretch out to a 10" round and cover loosely with plastic wrap. Heat 1 Tbsp. oil in a large cast-iron skillet over medium. Cook sausage, breaking up into small pieces with a wooden spoon, until browned in spots and cooked though, 5–8 minutes. Transfer sausage to a small bowl. Remove skillet from heat and carefully lay dough inside (use spoon to help you extend dough all the way to the edges). Season with salt, then spread marinara over entire surface of dough. Top with mozzarella, then fennel, garlic, and cooked sausage. Drizzle with another 2 Tbsp. oil. Peek underneath the crust—the bottom should be golden brown and crisp from residual heat in the skillet. If it’s not, set over medium-low and cook until crust is golden brown, about 3 minutes. Transfer skillet to oven and bake pizza on top rack until crust is golden brown around the edges and cheese is browned in spots and bubbling all over, 10–14 minutes. Let cool 5 minutes, then top with red pepper flakes and basil. Sprinkle with more salt and drizzle with remaining 1 Tbsp. oil.',
    '35 minutes',
    7,
    '9ba39ce8-0983-4c6c-a781-fae378838c16',
    FALSE
  ),
  (
    '4a8d066b-9b5a-425a-9ef3-f04f364d3460',
    'Alex''s Tortilla Soup',
    'Lindsay Ostrom',
    'Place all soup ingredients in the Instant Pot. Cook on high pressure for 3 minutes. Quick release steam. Tortilla Strips: Cut the tortillas into small strips. Heat the oil in a heavy pan over medium high heat. Working in batches, add tortilla strips and fry in the hot oil for a few minutes until golden and crispy. Remove with tongs, drain on paper towels, and sprinkle with salt. Serve: Stir about half of your tortilla strips into the soup and reserve the remaining half for topping. Top individual bowls with… well… everything! I highly recommend avocado, and definitely don’t forget the lime.',
    '15 minutes',
    5,
    '9ba39ce8-0983-4c6c-a781-fae378838c16',
    TRUE
  ),
  (
    'd75013b9-efcb-447b-8f9c-21fea8813699',
    'Alex''s Easy Baked Ribs',
    'Adam',
    'Heat oven to 275 degrees Fahrenheit (135C). If the ribs still have the thin membrane covering the back of the rack, remove it. See how in the notes section below. Season both sides of the ribs with a generous amount of salt and pepper then place, meat-side up, into a large roasting pan or rimmed baking sheet. (It may be necessary to cut the ribs in half in order for them to fit into the pan). Cover the pan or baking sheet tightly with aluminum foil, and then bake until the meat falls easily from the bones, 3 to 4 hours.While the ribs bake, make the barbecue sauce. Heat the olive oil in a saucepan over medium heat. Add the onions and cook until soft and translucent, 5 to 8 minutes. Stir in the cumin and cook for an additional 30 seconds. Add the ketchup, hot chili sauce, brown sugar, and apple cider vinegar. Stir to combine, season with salt then cook for 2 minutes. Set aside in preparation for the ribs to finish roasting. Remove the ribs from the oven, discard the aluminum foil and generously brush both sides with barbecue sauce. Optional: Move an oven rack near to the top of the oven. Turn broiler to high and broil the ribs for 3-4 minutes, just until the barbecue sauce begins to caramelize. (Keep a close eye on the ribs while they broil so they the sauce does not burn.)',
    '4 hours 15 minutes',
    4,
    '9ba39ce8-0983-4c6c-a781-fae378838c16',
    TRUE
  ),
  --Claire, 'b2bb31f7-8c31-4058-8885-9404e2add1c1'
    (
    '5fc34a17-ac87-4e3c-8ea5-02a381d0cc2b',
    'Claire''s Chocolate Cake',
    'Felicity Huffman',
    'Preheat oven to 350 degrees. Butter three 9-inch cake rounds. Dust with flour and tap out the excess. Mix together flour, sugar, cocoa, baking soda, baking powder, and salt in a stand mixer using a low speed until combined. Add eggs, buttermilk, warm water, oil, and vanilla. Beat on a medium speed until smooth. This should take just a couple of minutes. Divide batter among the three pans. I found that it took just over 3 cups of the batter to divide it evenly. Bake for 30-35 minutes until a toothpick inserted into the center comes out clean. Cool on wire racks for 15 minutes and then turn out the cakes onto the racks and allow to cool completely. Frost with your favorite frosting and enjoy!',
    '4 hours 15 minutes',
    4,
    'b2bb31f7-8c31-4058-8885-9404e2add1c1',
    TRUE
  );

INSERT INTO
  ingredients (
    recipe_id,
    amt,
    unit_set,
    ingredient
  )
  VALUES
('38f716f2-bf5c-4ce7-baab-d52cdc47de5b', 12, 'us_oz', 'store-bought pizza dough'),
('38f716f2-bf5c-4ce7-baab-d52cdc47de5b', 5, 'us_tbsp', 'extra - virgin olive oil, divided'),
('38f716f2-bf5c-4ce7-baab-d52cdc47de5b', 8, 'us_oz', 'sweet Italian sausage, casings removed'),
('38f716f2-bf5c-4ce7-baab-d52cdc47de5b', 1, 'none', 'Kosher salt'),
('38f716f2-bf5c-4ce7-baab-d52cdc47de5b', 1, 'us_thdcup', 'prepared marinara'),
('38f716f2-bf5c-4ce7-baab-d52cdc47de5b', 3, 'us_thdcup', 'coarsely grated low-moisture mozzarella'),
('38f716f2-bf5c-4ce7-baab-d52cdc47de5b', .5, 'x', 'small fennel bulb, very thinly sliced'),
('38f716f2-bf5c-4ce7-baab-d52cdc47de5b', 3, 'apprx_clv', 'garlic, very thinly sliced'),
('38f716f2-bf5c-4ce7-baab-d52cdc47de5b', 0, 'none', 'Crushed red pepper flakes and torn basil leaves (for serving)'),

('4783af4f-3766-48f4-9d43-40566189052a', 12, 'us_oz', 'secret store-bought pizza dough'),
('4783af4f-3766-48f4-9d43-40566189052a', 5, 'us_tbsp', 'extra - virgin olive oil, divided'),
('4783af4f-3766-48f4-9d43-40566189052a', 8, 'us_oz', 'sweet Italian sausage, casings removed'),
('4783af4f-3766-48f4-9d43-40566189052a', 1, 'none', 'secret Kosher salt'),
('4783af4f-3766-48f4-9d43-40566189052a', 1, 'us_thdcup', 'prepared marinara'),
('4783af4f-3766-48f4-9d43-40566189052a', 3, 'us_thdcup', 'secret coarsely grated low-moisture mozzarella'),
('4783af4f-3766-48f4-9d43-40566189052a', .5, 'x', 'small fennel bulb, very thinly sliced'),
('4783af4f-3766-48f4-9d43-40566189052a', 3, 'apprx_clv', 'garlic, very thinly sliced'),
('4783af4f-3766-48f4-9d43-40566189052a', 0, 'none', 'Crushed red pepper flakes and torn basil leaves (for serving)'),

('4a8d066b-9b5a-425a-9ef3-f04f364d3460', 1, 'apprx_hlv', 'onion, chopped'),
('4a8d066b-9b5a-425a-9ef3-f04f364d3460', 3, 'apprx_clv', 'garlic, minced'),
('4a8d066b-9b5a-425a-9ef3-f04f364d3460', 1, 'x', 'jalapeno, seeded and minced'),
('4a8d066b-9b5a-425a-9ef3-f04f364d3460', 2, 'x', 'large sweet potatoes, peeled and diced'),
('4a8d066b-9b5a-425a-9ef3-f04f364d3460', 1, 'apprx_can', '(28 - ounce per can) fire roasted crushed tomatoes'),
('4a8d066b-9b5a-425a-9ef3-f04f364d3460', 6, 'us_cup', 'vegetable broth'),
('4a8d066b-9b5a-425a-9ef3-f04f364d3460', 1, 'us_tbsp', 'chili powder'),
('4a8d066b-9b5a-425a-9ef3-f04f364d3460', 2, 'x', 'chipotle peppers in adobo (canned), minced'),
('4a8d066b-9b5a-425a-9ef3-f04f364d3460', 1, 'us_cup', 'sweet corn (optional)'),

( 'd75013b9-efcb-447b-8f9c-21fea8813699', 2.5, 'us_lb', 'lbs baby back pork ribs'),
( 'd75013b9-efcb-447b-8f9c-21fea8813699', 0, 'none', 'Salt and black pepper'),
( 'd75013b9-efcb-447b-8f9c-21fea8813699', 1, 'us_tbsp', 'olive oil'),
( 'd75013b9-efcb-447b-8f9c-21fea8813699', 1, 'us_qtcup', 'finely diced onion'),
( 'd75013b9-efcb-447b-8f9c-21fea8813699', .5, 'us_tsp', 'tsp ground cumin'),
( 'd75013b9-efcb-447b-8f9c-21fea8813699', 1, 'us_hcup', 'ketchup'),
( 'd75013b9-efcb-447b-8f9c-21fea8813699', 1,'us_tbsp', 'hot chili sauce'),
( 'd75013b9-efcb-447b-8f9c-21fea8813699', 2,'us_tbsp', 'light brown sugar'),
( 'd75013b9-efcb-447b-8f9c-21fea8813699', 1, 'us_tbsp', 'apple cider vinegar'),

( '5fc34a17-ac87-4e3c-8ea5-02a381d0cc2b', 0, 'none', 'butter and flour for coating and dusting the cake pan'),
( '5fc34a17-ac87-4e3c-8ea5-02a381d0cc2b', 3, 'us_cup', 'all-purpose flour'),
( '5fc34a17-ac87-4e3c-8ea5-02a381d0cc2b', 3, 'us_cup', 'granulated sugar'),
( '5fc34a17-ac87-4e3c-8ea5-02a381d0cc2b', 1, 'us_hcup', 'unsweetened cocoa powder'),
( '5fc34a17-ac87-4e3c-8ea5-02a381d0cc2b', 1, 'us_tbsp', 'baking soda'),
( '5fc34a17-ac87-4e3c-8ea5-02a381d0cc2b', 1, 'us_tsp', '1/2 teaspoons baking powder'),
( '5fc34a17-ac87-4e3c-8ea5-02a381d0cc2b', 1, 'us_tsp', '1/2 teaspoons salt'),
( '5fc34a17-ac87-4e3c-8ea5-02a381d0cc2b', 4, 'x', 'large eggs'),
( '5fc34a17-ac87-4e3c-8ea5-02a381d0cc2b', 1, 'us_hcup', 'buttermilk'),
( '5fc34a17-ac87-4e3c-8ea5-02a381d0cc2b', 1, 'us_hcup', 'warm water'),
( '5fc34a17-ac87-4e3c-8ea5-02a381d0cc2b', 1, 'us_hcup', 'vegetable oil'),
( '5fc34a17-ac87-4e3c-8ea5-02a381d0cc2b', 2, 'us_tsp', 'vanilla extract');
 
COMMIT;