const bcrypt = require('bcryptjs'),
  uuid = require('uuid'),
  jwt = require('jsonwebtoken');

//TODO stage ingredients/units, alter ingredients to take them

function makeUsersArray() {
  return [
    {
      id: uuid(),
      first_name: 'Test-1',
      last_name: 'Test-1',
      username: 'superjim',
      password: 'password',
      date_created: new Date('2029-01-22T16:28:32.615Z')
    },
    {
      id: uuid(),
      first_name: 'Test-2',
      last_name: 'Test-2',
      username: 'middlemarno',
      password: 'password',
      date_created: new Date('2029-01-22T16:28:32.615Z')
    },
    {
      id: uuid(),
      first_name: 'Test-3',
      last_name: 'Test-3',
      username: 'superpat022',
      password: 'password',
      date_created: new Date('2029-01-22T16:28:32.615Z')
    },
    {
      id: uuid(),
      first_name: 'Test-4',
      last_name: 'Test-4',
      username: 'choppybit',
      password: 'password',
      date_created: new Date('2029-01-22T16:28:32.615Z')
    }
  ];
}

function makeUnitsArray() {
  return [
    { id: 1,
      unit_set: 'test-1',
      unit_data: '{"unit_single":"t1", "unit_plural":"t1s"}'
    },
    { id: 2,
      unit_set: 'test-2',
      unit_data: '{"unit_single":"t2", "unit_plural":"t2s"}'
    },
    { id: 3,
      unit_set: 'test-3',
      unit_data: '{"unit_single":"t3", "unit_plural":"t3s"}'
    },
    { id: 4,
      unit_set: 'test-4',
      unit_data: '{"unit_single":"t4", "unit_plural":"t4s"}'
    },
  ];
}

function makeRecipesArray(users) {
  return [
    {
      id: uuid(),
      name: 'Mary Recipe 1',
      author: 'Mary Fakename',
      instructions: 'Eiusmod ut sint sunt sit aliquip laboris excepteur nostrud ullamco quis ea anim. Ipsum ex et anim eu id velit occaecat non. Ea id nisi culpa veniam esse ut aute culpa nulla commodo deserunt. Amet elit in enim ullamco Lorem adipisicing eiusmod proident fugiat tempor aliqua amet mollit proident. Aute ullamco exercitation quis nisi labore est sint qui nostrud. Veniam velit exercitation aliquip amet excepteur aliquip proident sunt labore ullamco exercitation deserunt voluptate.',
      prep_time: '30 minutes',
      servings: 6,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
      user_id: users[0].id
    },
    {
      id: uuid(),
      name: 'Mary Recipe 2',
      author: 'Julia Childs',
      instructions: 'Eiusmod ut sint sunt sit aliquip laboris excepteur nostrud ullamco quis ea anim. Ipsum ex et anim eu id velit occaecat non. Ea id nisi culpa veniam esse ut aute culpa nulla commodo deserunt. Amet elit in enim ullamco Lorem adipisicing eiusmod proident fugiat tempor aliqua amet mollit proident. Aute ullamco exercitation quis nisi labore est sint qui nostrud. Veniam velit exercitation aliquip amet excepteur aliquip proident sunt labore ullamco exercitation deserunt voluptate.',
      prep_time: '90 minutes',
      servings: 6,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
      user_id: users[0].id
    },
    {
      id: uuid(),
      name: 'Mary Recipe 3',
      author: 'Phillip Seymour Hoffman',
      instructions: 'Eiusmod ut sint sunt sit aliquip laboris excepteur nostrud ullamco quis ea anim. Ipsum ex et anim eu id velit occaecat non. Ea id nisi culpa veniam esse ut aute culpa nulla commodo deserunt. Amet elit in enim ullamco Lorem adipisicing eiusmod proident fugiat tempor aliqua amet mollit proident. Aute ullamco exercitation quis nisi labore est sint qui nostrud. Veniam velit exercitation aliquip amet excepteur aliquip proident sunt labore ullamco exercitation deserunt voluptate.',
      prep_time: '1 hour 30 minutes',
      servings: 6,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
      user_id: users[0].id
    },
    {
      id: uuid(),
      name: 'Jimmy Recipe 1',
      author: 'Jimmy Buffet',
      instructions: 'Eiusmod ut sint sunt sit aliquip laboris excepteur nostrud ullamco quis ea anim. Ipsum ex et anim eu id velit occaecat non. Ea id nisi culpa veniam esse ut aute culpa nulla commodo deserunt. Amet elit in enim ullamco Lorem adipisicing eiusmod proident fugiat tempor aliqua amet mollit proident. Aute ullamco exercitation quis nisi labore est sint qui nostrud. Veniam velit exercitation aliquip amet excepteur aliquip proident sunt labore ullamco exercitation deserunt voluptate.',
      prep_time: '30 minutes',
      servings: 8,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
      user_id: users[1].id
    },
    {
      id: uuid(),
      name: 'John Recipe 1',
      author: 'John Denver',
      instructions: 'Eiusmod ut sint sunt sit aliquip laboris excepteur nostrud ullamco quis ea anim. Ipsum ex et anim eu id velit occaecat non. Ea id nisi culpa veniam esse ut aute culpa nulla commodo deserunt. Amet elit in enim ullamco Lorem adipisicing eiusmod proident fugiat tempor aliqua amet mollit proident. Aute ullamco exercitation quis nisi labore est sint qui nostrud. Veniam velit exercitation aliquip amet excepteur aliquip proident sunt labore ullamco exercitation deserunt voluptate.',
      prep_time: '30 minutes',
      servings: 3,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
      user_id: users[2].id
    }
  ];
}

function makeIngredientsArray(recipes, units) {
  return [
    {
      recipe_id: recipes[0].id,
      amt: 1,
      unit_set: units[0].unit_set,
      ingredient: 'test-ingredient-1',
    },
    {
      recipe_id: recipes[0].id,
      amt: 1,
      unit_set: units[1].unit_set,
      ingredient: 'test-ingredient-2',
    },
    {
      recipe_id: recipes[0].id,
      amt: 1,
      unit_set: units[2].unit_set,
      ingredient: 'test-ingredient-3',
    },
    {
      recipe_id: recipes[0].id,
      amt: 1,
      unit_set: units[3].unit_set,
      ingredient: 'test-ingredient-4',
    },
    // {
    //   recipe_id: recipes[0].id,
    //   amt: 1,
    //   // unit_set: '',
    //   unit_data: {
    //     unit_single: 'custom-unit',
    //     unit_plural: 'custom-unit'
    //   },
    //   ingredient: 'test-ingredient-5',
    // },
    // {
    //   recipe_id: recipes[1].id,
    //   amt: 1,
    //   unit_set: units[0].unit_set,
    //   ingredient: 'test-ingredient-1',
    // },
    // {
    //   recipe_id: recipes[1].id,
    //   amt: 1,
    //   unit_set: units[1].unit_set,
    //   ingredient: 'test-ingredient-2',
    // },
    // {
    //   recipe_id: recipes[1].id,
    //   amt: 1,
    //   unit_set: units[2].unit_set,
    //   ingredient: 'test-ingredient-3',
    // },
    // {
    //   recipe_id: recipes[1].id,
    //   amt: 1,
    //   unit_set: units[3].unit_set,
    //   ingredient: 'test-ingredient-4',
    // },
    // {
    //   recipe_id: recipes[1].id,
    //   amt: 1,
    //   // unit_set: '',
    //   unit_data: {
    //     unit_single: 'custom-unit',
    //     unit_plural: 'custom-unit'
    //   },
    //   ingredient: 'test-ingredient-5',
    // },
    // {
    //   recipe_id: recipes[2].id,
    //   amt: 1,
    //   unit_set: units[0].unit_set,
    //   ingredient: 'test-ingredient-1',
    // },
    // {
    //   recipe_id: recipes[2].id,
    //   amt: 1,
    //   unit_set: units[1].unit_set,
    //   ingredient: 'test-ingredient-2',
    // },
    // {
    //   recipe_id: recipes[2].id,
    //   amt: 1,
    //   unit_set: units[2].unit_set,
    //   ingredient: 'test-ingredient-3',
    // },
    // {
    //   recipe_id: recipes[2].id,
    //   amt: 1,
    //   unit_set: units[3].unit_set,
    //   ingredient: 'test-ingredient-4',
    // },
    // {
    //   recipe_id: recipes[2].id,
    //   amt: 1,
    //   // unit_set: '',
    //   unit_data: {
    //     unit_single: 'custom-unit',
    //     unit_plural: 'custom-unit'
    //   },
    //   ingredient: 'test-ingredient-5',
    // },
    // {
    //   recipe_id: recipes[3].id,
    //   amt: 1,
    //   unit_set: units[0].unit_set,
    //   ingredient: 'test-ingredient-1',
    // },
    // {
    //   recipe_id: recipes[3].id,
    //   amt: 1,
    //   unit_set: units[1].unit_set,
    //   ingredient: 'test-ingredient-2',
    // },
    // {
    //   recipe_id: recipes[3].id,
    //   amt: 1,
    //   unit_set: units[2].unit_set,
    //   ingredient: 'test-ingredient-3',
    // },
    // {
    //   recipe_id: recipes[3].id,
    //   amt: 1,
    //   unit_set: units[3].unit_set,
    //   ingredient: 'test-ingredient-4',
    // },
    // {
    //   recipe_id: recipes[3].id,
    //   amt: 1,
    //   // unit_set: '',
    //   unit_data: {
    //     unit_single: 'custom-unit',
    //     unit_plural: 'custom-unit'
    //   },
    //   ingredient: 'test-ingredient-5',
    // },
    // {
    //   recipe_id: recipes[4].id,
    //   amt: 1,
    //   unit_set: units[0].unit_set,
    //   ingredient: 'test-ingredient-1',
    // },
    // {
    //   recipe_id: recipes[4].id,
    //   amt: 1,
    //   unit_set: units[1].unit_set,
    //   ingredient: 'test-ingredient-2',
    // },
    // {
    //   recipe_id: recipes[4].id,
    //   amt: 1,
    //   unit_set: units[2].unit_set,
    //   ingredient: 'test-ingredient-3',
    // },
    // {
    //   recipe_id: recipes[4].id,
    //   amt: 1,
    //   unit_set: units[3].unit_set,
    //   ingredient: 'test-ingredient-4',
    // },
    // {
    //   recipe_id: recipes[4].id,
    //   amt: 1,
    //   // unit_set: '',
    //   unit_data: {
    //     unit_single: 'custom-unit',
    //     unit_plural: 'custom-unit'
    //   },
    //   ingredient: 'test-ingredient-5',
    // },
  ];
}

function makeExpectedRecipe(recipe) {
  return {
    id: recipe.id,
    name: recipe.name,
    author: recipe.author,
    instructions: recipe.instructions,
    prep_time: recipe.prep_time,
    servings: recipe.servings,
    date_created: recipe.date_created.toISOString()
  };
}

function makeMaliciousRecipe() {
  const maliciousArticle = {
    id: uuid(),
    name: 'A Foul Name <script>alert("xss");</script>',
    author: 'Jim Fakeman',
    ingredients: [
      'Sadness<script>alert("xss");</script>', 'Madness<script>alert("xss");</script>', 'Gladness<script>alert("xss");</script>'
    ],
    instructions: '<img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);"><em>Do the things!</em>',
    prep_time: '30 minutes',
    servings: 3,
    date_created: new Date('2029-01-22T16:28:32.615Z')
  };
  const expectedArticle = {
    ...makeExpectedRecipe(maliciousArticle),
    name: 'A Foul Name &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
    ingredients: ['Sadness&lt;script&gt;alert(\"xss\");&lt;/script&gt;', 'Madness&lt;script&gt;alert(\"xss\");&lt;/script&gt;', 'Gladness&lt;script&gt;alert(\"xss\");&lt;/script&gt;'],
    instructions: '<img src="https://url.to.file.which/does-not.exist"><em>Do the things!</em>',
  };
  return {
    maliciousArticle,
    expectedArticle
  };
}

function makeRecipesFixtures() {
  const testUsers = makeUsersArray();
  const testUnits = makeUnitsArray();
  const testRecipes = makeRecipesArray(testUsers);
  const testIngredients = makeIngredientsArray(testRecipes, testUnits);
  return { testUsers, testUnits, testRecipes, testIngredients };
}


function cleanTables(db) {
  return db.transaction(trx =>
    trx.raw(
      `TRUNCATE
        ingredients,
        recipes,
        units,
        users
        RESTART IDENTITY CASCADE;
        `
    )
  );
}

function seedUsers(db, users) {
  const preppedUsers = users.map(user => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1)
  }));
  return db.into('users').insert(preppedUsers);
}

function seedRecipesTables(db, users, units, recipes, ingredients) {
  return db.transaction(async trx => {
    await seedUsers(trx, users);
    await trx.into('units').insert(units);
    await trx.into('recipes').insert(recipes);
    await trx.into('ingredients').insert(ingredients);
  });
}

function seedMaliciousRecipe(db, user, recipe) {
  return seedUsers(db, [user])
    .then(() =>
      db
        .into('recipes')
        .insert([recipe])
    );
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.id }, secret, {
    subject: user.username,
    algorithm: 'HS256',
  });
  return `Bearer ${token}`;
}

module.exports = {
  //Test Data
  makeRecipesArray,
  seedRecipesTables,
  cleanTables,

  //Fixtures
  seedUsers,
  makeRecipesFixtures,

  //XSS Testing
  makeMaliciousRecipe,
  makeExpectedRecipe,
  seedMaliciousRecipe,

  //Authentication
  makeAuthHeader
};