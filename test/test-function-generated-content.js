// function makeTestUser(index = 0) {
//   return {
//     id: uuid(),
//     first_name: `test-firstname-${index}`,
//     last_name: `test-lastname-${index}`,
//     username: `test-username-${index}`,
//     date_created: new Date(),
//     password: testPasswordHash
//   };
// }

// function makeTestUsers(number = 3) {
//   let testUsers = [];
//   for (let i = 1; i <= number; i++) {
//     testUsers[i - 1] = makeTestUser(i);
//   }
//   return testUsers;
// }

// function makeTestRecipe(testUser = makeTestUser()) {
//   let recipeId = uuid();
//   return {
//     recipe: {
//       id: recipeId,
//       user_id: testUser.id,
//       name: 'test-recipe-name',
//       author: 'test-recipe-author',
//       prep_time_hours: 2,
//       prep_time_minutes: 2,
//       servings: 2,
//       instructions: 'test-recipe-instructions',
//     },
//     ingredients: makeTestIngredients(recipeId)
//   }
// }

// function makeTestRecipes(testUser = makeTestUser()) {

// }

// function makeTestUnit(unitId = 1) {
//   return {
//     id: unitId,
//     unit_set: `test-unit-set-${unitId}`,
//     unit_data: {
//       single: `test-${unitId}}`,
//       plural: `tests-${unitId}}`
//     }
//   };
// }

// function makeTestUnits(number = 3) {
//   let unitsArray = [];

//   for (let i = 1; i < number; i++) {
//     unitsArray[i - 1] = makeTestUnit(i);
//   }

//   return unitsArray;
// }

// function makeTestIngredients(recipeId = uuid(), index = 0, testUnits = makeTestUnits()) {
//   return {
//     id: uuid(),
//     recipe_id: recipeId,
//     amount: 1,
//     unit_set: testUnits[0].unit_set,
//     unit_data: null,
//     ing_text: `test-ingredient-${index}`,
//   }
// }

// function makeTestIngredients(number = 3) {

// }