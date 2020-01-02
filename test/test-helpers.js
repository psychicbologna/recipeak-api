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
    }
  ];
}

function makeUnitsArray() {
  return [
    {
      id: 1,
      unit_set: 'test-1',
      unit_data: '{"unit_single":"t1", "unit_plural":"t1s"}'
    },
    {
      id: 2,
      unit_set: 'test-2',
      unit_data: '{"unit_single":"t2", "unit_plural":"t2s"}'
    },
    {
      id: 3,
      unit_set: 'test-3',
      unit_data: '{"unit_single":"t3", "unit_plural":"t3s"}'
    },
  ];
}

function makeRecipesArray(testUser) {
  console.log(testUser.id);
  return [
    {
      id: uuid(),
      name: 'Mary Recipe 1',
      author: 'Mary Fakename',
      instructions: 'Eiusmod ut sint sunt sit aliquip laboris excepteur nostrud ullamco quis ea anim. Ipsum ex et anim eu id velit occaecat non. Ea id nisi culpa veniam esse ut aute culpa nulla commodo deserunt. Amet elit in enim ullamco Lorem adipisicing eiusmod proident fugiat tempor aliqua amet mollit proident. Aute ullamco exercitation quis nisi labore est sint qui nostrud. Veniam velit exercitation aliquip amet excepteur aliquip proident sunt labore ullamco exercitation deserunt voluptate.',
      prep_time_hours: 1,
      prep_time_minutes: 1,
      servings: 6,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
      user_id: testUser.id
    },
    {
      id: uuid(),
      name: 'Mary Recipe 2',
      author: 'Julia Childs',
      instructions: 'Eiusmod ut sint sunt sit aliquip laboris excepteur nostrud ullamco quis ea anim. Ipsum ex et anim eu id velit occaecat non. Ea id nisi culpa veniam esse ut aute culpa nulla commodo deserunt. Amet elit in enim ullamco Lorem adipisicing eiusmod proident fugiat tempor aliqua amet mollit proident. Aute ullamco exercitation quis nisi labore est sint qui nostrud. Veniam velit exercitation aliquip amet excepteur aliquip proident sunt labore ullamco exercitation deserunt voluptate.',
      prep_time_hours: 1,
      prep_time_minutes: 1,
      servings: 6,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
      user_id: testUser.id
    },
    {
      id: uuid(),
      name: 'Mary Recipe 3',
      author: 'Phillip Seymour Hoffman',
      instructions: 'Eiusmod ut sint sunt sit aliquip laboris excepteur nostrud ullamco quis ea anim. Ipsum ex et anim eu id velit occaecat non. Ea id nisi culpa veniam esse ut aute culpa nulla commodo deserunt. Amet elit in enim ullamco Lorem adipisicing eiusmod proident fugiat tempor aliqua amet mollit proident. Aute ullamco exercitation quis nisi labore est sint qui nostrud. Veniam velit exercitation aliquip amet excepteur aliquip proident sunt labore ullamco exercitation deserunt voluptate.',
      prep_time_hours: 1,
      prep_time_minutes: 1,
      servings: 6,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
      user_id: testUser.id
    },
  ];
}

function makeIngredientsArray(recipe, units) {
  return [
    {
      recipe_id: recipe.id,
      amount: 1,
      unit_set: units[0].unit_set,
      ing_text: 'test-ingredient-1',
    },
    {
      recipe_id: recipe.id,
      amount: 1,
      unit_set: units[1].unit_set,
      ing_text: 'test-ingredient-2',
    },
    {
      recipe_id: recipe.id,
      amount: 1,
      unit_set: units[2].unit_set,
      ing_text: 'test-ingredient-3',
    }
  ];
}

function makeExpectedRecipe(recipe) {
  return {
    id: recipe.id,
    user_id: recipe.user_id,
    name: recipe.name,
    author: recipe.author,
    instructions: recipe.instructions,
    prep_time_hours: recipe.prep_time_hours,
    prep_time_minutes: recipe.prep_time_minutes,
    servings: recipe.servings,
    date_created: recipe.date_created.toISOString(),
  };
}

function makeNewRecipe(testUser, testUnits) {
  return {

    id: '',
    user_id: testUser.id,
    name: 'Test',
    author: 'foobar',
    prep_time_hours: 1,
    prep_time_minutes: 1,
    servings: 3,
    instructions: 'Test do things test do things',
    ingredients: {
      ingredientsAddList: [
        {
          amount: 3,
          ing_text: 'Test 1',
          unit_set: testUnits[0].unit_set
        }
      ]
    }

  };
}

function makeUpdatedRecipe(recipe, testUnits) {
  return {
    id: recipe.id,
    user_id: recipe.user_id,
    name: `EDITED-${recipe.name}`,
    author: `EDITED-${recipe.author}`,
    prep_time_hours: recipe.prep_time_hours + 1,
    prep_time_minutes: recipe.prep_time_minutes + 1,
    servings: 9,
    instructions: `EDITED-${recipe.instructions}`,
    ingredients: {
      ingredientsAddList: [
        {
          amount: 2,
          ing_text: 'ADDED ingredient',
          unit_set: testUnits[0].unit_set
        }
      ],
      ingredientsEditList: [],
      ingredientsDeleteList: [],
    }
  };
}

// function makeMaliciousRecipe() {
//   const maliciousArticle = {
//     id: uuid(),
//     name: 'A Foul Name <script>alert("xss");</script>',
//     author: 'Jim Fakeman<script>alert("xss")</script>',
//     instructions: 'Gladness<script>alert("xss");</script>',
//     ingredients: [
//       {
//         id: uuid(),
//         name: 'Sadness<script>alert("xss");</script>',
//         ing_text: 'Madness<script>alert("xss");</script>',
//         unit_set: testUnits[0].unit_set
//       },

//       {
//         id: uuid(),
//         name: 'Sadness<script>alert("xss");</script>',
//         ing_text: 'Madness<script>alert("xss");</script>',
//         unit_data: {
//           unit_single: 'Gladness<script>alert("xss");</script>',
//           unit_single: 'Gladness<script>alert("xss");</script>'
//         }
//       }
//     ],
//     date_created: new Date('2029-01-22T16:28:32.615Z')
//   };
// const expectedArticle = {
//   ...makeExpectedRecipe(maliciousArticle),
//   name: 'A Foul Name &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
//   ingredients: ['Sadness&lt;script&gt;alert(\"xss\");&lt;/script&gt;', 'Madness&lt;script&gt;alert(\"xss\");&lt;/script&gt;', 'Gladness&lt;script&gt;alert(\"xss\");&lt;/script&gt;'],
//   instructions: '<img src="https://url.to.file.which/does-not.exist"><em>Do the things!</em>',
// };
// return {
//   maliciousArticle,
//   expectedArticle
// };
// }

function makeRecipesFixtures() {
  const testUsers = makeUsersArray();
  const testUnits = makeUnitsArray();
  const testRecipes = makeRecipesArray(testUsers[0]);
  const testIngredients = testRecipes.map(recipe => makeIngredientsArray(recipe, testUnits));
  const testNewRecipe = makeNewRecipe(testUsers, testUnits, testIngredients);
  return { testUsers, testUnits, testRecipes, testIngredients, testNewRecipe };
}


function cleanTables(db) {
  return db.transaction(async trx => {
    await trx.raw(`TRUNCATE ingredients RESTART IDENTITY CASCADE`)
    await trx.raw(`TRUNCATE units RESTART IDENTITY CASCADE`)
    await trx.raw(`TRUNCATE recipes RESTART IDENTITY CASCADE`)
    await trx.raw(`TRUNCATE users RESTART IDENTITY CASCADE`)
  });
}

function seedUsers(db, users) {
  const preppedUsers = users.map(user => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1)
  }));
  return db.into('users').insert(preppedUsers);
}

function seedUnits(db, units) {
  return db.into('units').insert(units);
}

function seedRecipesTables(db, users, units, recipes, ingredients) {

  // console.log('db: ', db);
  // console.log('users: ', users);
  // console.log('units: ', units);
  // console.log('recipes: ', recipes);
  // console.log('ingredients', ingredients);

  return db.transaction(async trx => {
    await seedUsers(trx, users);
    await trx.into('units').insert(units);
    await trx.into('recipes').insert(recipes);

    for (let i = 0; i < ingredients.length; i++) {
      for (let j = 0; j < ingredients[i].length; j++) {
        await trx.into('ingredients').insert(ingredients[i][j]);
      }
    }
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
  makeNewRecipe,
  makeRecipesArray,
  seedRecipesTables,
  cleanTables,

  //Fixtures
  seedUsers,
  seedUnits,
  makeRecipesFixtures,
  makeUpdatedRecipe,

  //XSS Testing
  // makeMaliciousRecipe,
  makeExpectedRecipe,
  seedMaliciousRecipe,

  //Authentication
  makeAuthHeader
};