function makeRecipesArray() {
  [
    {
      id: '7b3cb196-7f7d-4fd6-8cd5-2121e75fc95d',
      name: 'Recipe Name 1',
      author: 'Mary Fakename',
      ingredients: [
        'Ingredient 1', 'Ingredient 2', 'Ingredient 3'
      ],
      instructions: 'Eiusmod ut sint sunt sit aliquip laboris excepteur nostrud ullamco quis ea anim. Ipsum ex et anim eu id velit occaecat non. Ea id nisi culpa veniam esse ut aute culpa nulla commodo deserunt. Amet elit in enim ullamco Lorem adipisicing eiusmod proident fugiat tempor aliqua amet mollit proident. Aute ullamco exercitation quis nisi labore est sint qui nostrud. Veniam velit exercitation aliquip amet excepteur aliquip proident sunt labore ullamco exercitation deserunt voluptate.',
      prep_time: '30 minutes',
      yield: 6,
      date_created: '2019-10-16T11:39:06.385Z'
    },
    {
      id: '6287fc5c-13dd-4912-ae32-cee2328f311d',
      name: 'Recipe Name 2',
      author: 'Jimmy Buffet',
      ingredients: [
        'Ingredient 1', 'Ingredient 2', 'Ingredient 3'
      ],
      instructions: 'Eiusmod ut sint sunt sit aliquip laboris excepteur nostrud ullamco quis ea anim. Ipsum ex et anim eu id velit occaecat non. Ea id nisi culpa veniam esse ut aute culpa nulla commodo deserunt. Amet elit in enim ullamco Lorem adipisicing eiusmod proident fugiat tempor aliqua amet mollit proident. Aute ullamco exercitation quis nisi labore est sint qui nostrud. Veniam velit exercitation aliquip amet excepteur aliquip proident sunt labore ullamco exercitation deserunt voluptate.',
      prep_time: '30 minutes',
      yield: 8,
      date_created: '2019-10-16T11:39:06.385Z'
    },
    {
      id: '64d6ceb6-6bee-4da5-90d8-21d337dda8f3',
      name: 'Recipe Name 1',
      author: 'John Denver',
      ingredients: [
        'Ingredient 1', 'Ingredient 2', 'Ingredient 3'
      ],
      instructions: 'Eiusmod ut sint sunt sit aliquip laboris excepteur nostrud ullamco quis ea anim. Ipsum ex et anim eu id velit occaecat non. Ea id nisi culpa veniam esse ut aute culpa nulla commodo deserunt. Amet elit in enim ullamco Lorem adipisicing eiusmod proident fugiat tempor aliqua amet mollit proident. Aute ullamco exercitation quis nisi labore est sint qui nostrud. Veniam velit exercitation aliquip amet excepteur aliquip proident sunt labore ullamco exercitation deserunt voluptate.',
      prep_time: '30 minutes',
      yield: 3,
      date_created: '2019-10-16T11:39:06.385Z'
    }
  ];
}

const users = [
  {
    id: 'ce1c15de-cc28-4789-aced-62d3cafea5f1',
    name: 'Jim',
    last_name: 'Fakeman',
    username: 'SuperJim',
    date_created: '2018-11-16T01:00:00'
  },
  {
    id: '2059541e-937e-4bd2-aa23-b55f27f289b9',
    first_name: 'Marnie',
    last_name: 'Falsehood',
    username: 'MiddleMarno',
    date_created: '2016-05-16T01:00:00'
  },
  {
    id: 'e7d8ed3a-7d7e-43d2-bc47-53e5d9ef275a',
    name: 'Pat',
    last_name: 'CooksALot',
    username: 'superpat022',
    date_created: '2014-01-17T01:00:00'
  }
];

function makeExpectedRecipe(users, recipe) {


  return {
    id: recipe.id,
    name: recipe.name,
    author: user.id,
    ingredients: recipe.ingredients,
    instructions: recipe.instructions,
    prep_time: recipe.prep_time,
    yield: recipe.yield,
    date_created: recipe.date_created
  }
}

function makeMaliciousRecipe(user) {
  const maliciousArticle = {
    id: '658e84f0-a6b6-49c1-b58d-538bf14866ce',
    name: 'A Foul Name <script>alert("xss");</script>',
    author: user.id,
    ingredients: [
      'Sadness<script>alert("xss");</script>', 'Madness<script>alert("xss");</script>', 'Gladness<script>alert("xss");</script>'
    ],
    instructions: '<img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);"><em>Do the things!</em>',
    prep_time: '30 minutes',
    yield: 3,
    date_created: new Date()
  };

  const expectedArticle = {
    ...makeExpectedRecipe([user], maliciousArticle),
    name: 'A Foul Name &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
    ingredients: ['Sadness&lt;script&gt;alert(\"xss\");&lt;/script&gt;', 'Madness&lt;script&gt;alert(\"xss\");&lt;/script&gt;', 'Gladness&lt;script&gt;alert(\"xss\");&lt;/script&gt;'],
    instructions: '<img src="https://url.to.file.which/does-not.exist"><em>Do the things!</em>',

  };
}

module.exports = {
  makeRecipesArray
};