const knex = require('knex'),
  app = require('../src/app'),
  helpers = require('../test/test-helpers');

describe('Recipes Endpoints', function () {
  let db;
  console.dir(helpers);

  const {
    testRecipes
  } = helpers.makeRecipesFixtures();

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    });
    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());

  before('cleanup', () => db('recipes').truncate());

  afterEach('cleanup', () => db('recipes').truncate());

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
        testRecipes
      );
    });

    it('responds with 200 and all of the recipes', () => {
      const expectedRecipes = testRecipes.map(recipe => (
        helpers.makeExpectedRecipe(
          recipe
        )
      )
      );
      return supertest(app)
        .get('/api/recipes')
        .expect(200, expectedRecipes);
    });
  });
});