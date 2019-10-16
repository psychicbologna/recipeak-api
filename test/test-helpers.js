const uuid = require('uuid');

// //Staging users...
// const users = [
//   {
//     id: uuid(),
//     first_name: 'Jim',
//     last_name: 'Fakeman',
//     username: 'SuperJim',
//     date_created: new Date('2029-01-22T16:28:32.615Z')
//   },
//   {
//     id: uuid(),
//     first_name: 'Marnie',
//     last_name: 'Falsehood',
//     username: 'MiddleMarno',
//     date_created: new Date('2029-01-22T16:28:32.615Z')
//   },
//   {
//     id: uuid(),
//     first_name: 'Pat',
//     last_name: 'CooksALot',
//     username: 'superpat022',
//     date_created: new Date('2029-01-22T16:28:32.615Z')
//   }
// ];

function makeRecipesArray() {
  return [
    {
      id: uuid(),
      name: 'Recipe Name 1',
      author: 'Mary Fakename',
      ingredients: [
        'Ingredient 1', 'Ingredient 2', 'Ingredient 3'
      ],
      instructions: 'Eiusmod ut sint sunt sit aliquip laboris excepteur nostrud ullamco quis ea anim. Ipsum ex et anim eu id velit occaecat non. Ea id nisi culpa veniam esse ut aute culpa nulla commodo deserunt. Amet elit in enim ullamco Lorem adipisicing eiusmod proident fugiat tempor aliqua amet mollit proident. Aute ullamco exercitation quis nisi labore est sint qui nostrud. Veniam velit exercitation aliquip amet excepteur aliquip proident sunt labore ullamco exercitation deserunt voluptate.',
      prep_time: '30 minutes',
      yield: 6,
      date_created: new Date('2029-01-22T16:28:32.615Z')
    },
    {
      id: uuid(),
      name: 'Recipe Name 2',
      author: 'Jimmy Buffet',
      ingredients: [
        'Ingredient 1', 'Ingredient 2', 'Ingredient 3'
      ],
      instructions: 'Eiusmod ut sint sunt sit aliquip laboris excepteur nostrud ullamco quis ea anim. Ipsum ex et anim eu id velit occaecat non. Ea id nisi culpa veniam esse ut aute culpa nulla commodo deserunt. Amet elit in enim ullamco Lorem adipisicing eiusmod proident fugiat tempor aliqua amet mollit proident. Aute ullamco exercitation quis nisi labore est sint qui nostrud. Veniam velit exercitation aliquip amet excepteur aliquip proident sunt labore ullamco exercitation deserunt voluptate.',
      prep_time: '30 minutes',
      yield: 8,
      date_created: new Date('2029-01-22T16:28:32.615Z')
    },
    {
      id: uuid(),
      name: 'Recipe Name 1',
      author: 'John Denver',
      ingredients: [
        'Ingredient 1', 'Ingredient 2', 'Ingredient 3'
      ],
      instructions: 'Eiusmod ut sint sunt sit aliquip laboris excepteur nostrud ullamco quis ea anim. Ipsum ex et anim eu id velit occaecat non. Ea id nisi culpa veniam esse ut aute culpa nulla commodo deserunt. Amet elit in enim ullamco Lorem adipisicing eiusmod proident fugiat tempor aliqua amet mollit proident. Aute ullamco exercitation quis nisi labore est sint qui nostrud. Veniam velit exercitation aliquip amet excepteur aliquip proident sunt labore ullamco exercitation deserunt voluptate.',
      prep_time: '30 minutes',
      yield: 3,
      date_created: new Date('2029-01-22T16:28:32.615Z')
    }
  ];
}

function makeExpectedRecipe(recipe) {
  return {
    id: recipe.id,
    name: recipe.name,
    author: recipe.author,
    ingredients: recipe.ingredients,
    instructions: recipe.instructions,
    prep_time: recipe.prep_time,
    yield: recipe.yield,
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
    yield: 3,
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
  const testRecipes = makeRecipesArray();
  return {testRecipes};
}


function cleanTables(db) {
  return db.transaction(trx =>
    trx.raw(
      `TRUNCATE
        recipes
        RESTART IDENTITY CASCADE;
        `
    )
  );
}

// TODO reference line 227 in blogful-api-auth when users implemented.
function seedRecipesTables(db, recipes) {
  return db.transaction(async trx => {
    if (recipes.length) {
      await trx.into('recipes').insert(recipes);
    }
  });
}

//Add '.then' for users when implemented.
function seedMaliciousRecipe(db, recipe) {
  return db
    .into('recipes')
    .insert([recipe]);
}

// function makeAuthHeader(user) {
//   const token = Buffer.from(`${user.user_name}:${user.password}`).toString('base64')
//   return `Basic ${token}`
// }

module.exports = {
  //Test Data
  makeRecipesArray,
  seedRecipesTables,
  cleanTables,

  //Fixtures
  makeRecipesFixtures,

  //XSS Testing
  makeMaliciousRecipe,
  makeExpectedRecipe,
  seedMaliciousRecipe,

  //Authentication(Not implemented yet)
  // makeAuthHeader
};