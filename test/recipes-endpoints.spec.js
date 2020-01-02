const knex = require('knex'),
  app = require('../src/app'),
  jwt = require('jsonwebtoken'),
  bcrypt = require('bcryptjs'),
  AuthService = require('../src/auth/auth-service'),
  helpers = require('./test-helpers'),
  config = require('../src/config');

describe.only('Recipes Endpoints', function () {
  let db;

  const {
    testUsers,
    testUnits,
    testRecipes,
    testIngredients,
    testNewRecipe
  } = helpers.makeRecipesFixtures();

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: config.TEST_DATABASE_URL,
    });
    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());

  before('cleanup', () => helpers.cleanTables(db));

  afterEach('cleanup', () => helpers.cleanTables(db));

  describe('GET /api/recipes', () => {
    context('Given no recipes in database', () => {
      it('responds with 200 and an empty list', () => {
        return supertest(app)
          .get('/api/recipes')
          .expect(200, []);
      });
    });
  });

  context('Given there are recipes in database', () => {
    beforeEach('insert recipes', () => {
      return helpers.seedRecipesTables(
        db,
        testUsers,
        testUnits,
        testRecipes,
        testIngredients
      );
    });

    afterEach('cleanup', () => helpers.cleanTables(db));

    it('responds with 200 and all of the recipes', () => {
      const expectedRecipes = testRecipes.map(recipe => (
        helpers.makeExpectedRecipe(recipe)
      )
      );
      return supertest(app)
        .get('/api/recipes')
        .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
        .expect(200, expectedRecipes);
    });
  });
  describe('POST /recipes', () => {
    describe('Protected Endpoints', () => {
      beforeEach('insert recipes', () => {
        return helpers.seedRecipesTables(
          db,
          testUsers,
          testUnits,
          testRecipes,
          testIngredients
        );
      });

      it('creates a recipe and responds with an id. The recipe may then be retrieved by this id.', () => {

        const { newRecipe, expectedRecipe } = testNewRecipe;

        return supertest(app)
          .post('/api/recipes')
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .send(newRecipe)
          .expect(200)
          .then(postRes =>
            supertest(app)
              .get(`/api/recipes/${postRes.body}`)
              .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
              .expect(getRes => {
                expect(getRes.body).to.have.property('recipe');
                expect(getRes.body.recipe.name).to.eql(newRecipe.name);
                expect(getRes.body.recipe.author).to.eql(newRecipe.author);
                expect(getRes.body.recipe.prep_time_hours).to.eql(newRecipe.prep_time_hours);
                expect(getRes.body.recipe.prep_time_minutes).to.eql(newRecipe.prep_time_minutes);
                expect(getRes.body.recipe.servings).to.eql(newRecipe.servings);
                expect(getRes.body.recipe.instructions).to.eql(newRecipe.instructions);
                expect(getRes.body.ingredients[0].amount).to.eql(newRecipe.ingredients.ingredientsAddList[0].amount);
                expect(getRes.body.ingredients[0].ing_text).to.eql(newRecipe.ingredients.ingredientsAddList[0].ing_text);
                expect(getRes.body.ingredients[0].unit_set).to.eql(newRecipe.ingredients.ingredientsAddList[0].unit_set);
              })
          );
      });

    });
  });

  describe('GET /recipes/:recipeid', () => {

    context(`Recipe doesn't exist`, () => {
      it(`responds with 404, 'Sorry, that recipe doesn't exist' when recipe id doesn't exist.`, () => {
        return supertest(app)
          .get(`/api/recipes/${testRecipes[0].id}`)
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(404, { error: 'Sorry, that recipe doesn\'t exist.' });
      });
    });

    context('Recipe exists', () => {
      beforeEach('insert recipes', () => {
        return helpers.seedRecipesTables(
          db,
          testUsers,
          testUnits,
          testRecipes,
          testIngredients
        );
      });

      it(`Responds with a status 200 and the requested recipe's data.`, () => {

        // console.log(testRecipes[0].ingredients);
        // console.log(testIngredients[0][0]);

        return supertest(app)
          .get(`/api/recipes/${testRecipes[0].id}`)
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(200)
          .expect(getRes => {
            expect(getRes.body).to.have.keys('recipe', 'ingredients');
            expect(getRes.body.recipe).to.eql(helpers.makeExpectedRecipe(testRecipes[0]));
            expect(getRes.body.ingredients[0].amount).to.eql(testIngredients[0][0].amount);
            expect(getRes.body.ingredients[0].ing_text).to.eql(testIngredients[0][0].ing_text);
            expect(getRes.body.ingredients[0].unit_set).to.eql(testIngredients[0][0].unit_set);
          });
      });
    });

  });

  describe('PATCH /recipes/:recipeid', () => {
    context(`Recipe doesn't exist`, () => {
      it(`responds with 404, 'Sorry, that recipe doesn't exist' when recipe id doesn't exist.`, () => {
        return supertest(app)
          .patch(`/api/recipes/${testRecipes[0].id}`)
          .expect(404, { error: 'Sorry, that recipe doesn\'t exist.' });
      });
    });

  });

  describe('DELETE /recipes/:recipeid', () => {
    context(`Recipe doesn't exist`, () => {
      it(`responds with 404, 'Sorry, that recipe doesn't exist' when recipe id doesn't exist.`, () => {
        return supertest(app)
          .patch(`/api/recipes/${testRecipes[0].id}`)
          .expect(404, { error: 'Sorry, that recipe doesn\'t exist.' });
      });
    });

  });

});