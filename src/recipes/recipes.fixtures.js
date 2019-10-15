function makeRecipesArray() {
  [
    {
      id: 1,
      name: 'Recipe Name 1',
      author: 'Mary Fakename',
      ingredients: [
        ['Ingredient 1', 'Ingredient 2', 'Ingredient 3']
      ],
      instructions: 'Eiusmod ut sint sunt sit aliquip laboris excepteur nostrud ullamco quis ea anim. Ipsum ex et anim eu id velit occaecat non. Ea id nisi culpa veniam esse ut aute culpa nulla commodo deserunt. Amet elit in enim ullamco Lorem adipisicing eiusmod proident fugiat tempor aliqua amet mollit proident. Aute ullamco exercitation quis nisi labore est sint qui nostrud. Veniam velit exercitation aliquip amet excepteur aliquip proident sunt labore ullamco exercitation deserunt voluptate.',
      prep_time: '30 minutes',
      yield: 6
    },
    {
      id: 2,
      name: 'Recipe Name 2',
      author: 'Jimmy Buffet',
      ingredients: [
        ['Ingredient 1', 'Ingredient 2', 'Ingredient 3']
      ],
      instructions: 'Eiusmod ut sint sunt sit aliquip laboris excepteur nostrud ullamco quis ea anim. Ipsum ex et anim eu id velit occaecat non. Ea id nisi culpa veniam esse ut aute culpa nulla commodo deserunt. Amet elit in enim ullamco Lorem adipisicing eiusmod proident fugiat tempor aliqua amet mollit proident. Aute ullamco exercitation quis nisi labore est sint qui nostrud. Veniam velit exercitation aliquip amet excepteur aliquip proident sunt labore ullamco exercitation deserunt voluptate.',
      prep_time: '30 minutes',
      yield: 8
    },
    {
      id: 3,
      name: 'Recipe Name 1',
      author: 'John Denver',
      ingredients: [
        ['Ingredient 1', 'Ingredient 2', 'Ingredient 3']
      ],
      instructions: 'Eiusmod ut sint sunt sit aliquip laboris excepteur nostrud ullamco quis ea anim. Ipsum ex et anim eu id velit occaecat non. Ea id nisi culpa veniam esse ut aute culpa nulla commodo deserunt. Amet elit in enim ullamco Lorem adipisicing eiusmod proident fugiat tempor aliqua amet mollit proident. Aute ullamco exercitation quis nisi labore est sint qui nostrud. Veniam velit exercitation aliquip amet excepteur aliquip proident sunt labore ullamco exercitation deserunt voluptate.',
      prep_time: '30 minutes',
      yield: 3
    }
  ];
}

function makeMaliciousRecipe() {

}

module.exports = { makeRecipeArray }