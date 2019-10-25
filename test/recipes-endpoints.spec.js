const knex = require('knex'),
  app = require('../src/app'),
  bcrypt = require('bcryptjs'),
  AuthService = require('../src/auth/auth-service'),
  helpers = require('../test/test-helpers');

describe('Recipes Endpoints', function () {
  let db;
  // console.dir(helpers);

  const {
    testUsers,
    testUnits,
    testNewRecipe,
    testRecipes,
    testIngredients,
  } = helpers.makeRecipesFixtures();


  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
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

    it('responds with 200 and all of the public recipes', () => {
      const expectedRecipes = testRecipes.map(recipe => (
        helpers.makeExpectedRecipe(recipe)
      )
      );
      return supertest(app)
        .get('/api/recipes')
        .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
        .where('recipe_public', 'true')
        .expect(200, expectedRecipes);
    });
  });
  describe(`POST /recipes`, () => {
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

      it('responds with \'401 Missing basic token when no basic token\'.', () => { 
        return supertest(app)
          .get('/api/recipes/123')
          .expect(401, {error: 'Missing bearer token'});
      });

      console.log(helpers.makeAuthHeader(testUsers[0]));

      it('creates a recipe, responding with 201 and the recipe.', () => {
        return supertest(app)
          .post('/api/recipes')
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .send(testNewRecipe)
          .expect(201)
          .expect(res => {
            expect(res.body).to.have.property('id');
            expect(res.body.user_id).to.eql(testNewRecipe.user_id);
            expect(res.body.name).to.eql(testNewRecipe.name);
            expect(res.body.author).to.eql(testNewRecipe.author);
            expect(res.body.prep_time).to.eql(testNewRecipe.prep_time);
            expect(res.body.servings).to.eql(testNewRecipe.servings);
            expect(res.body.instructions).to.eql(testNewRecipe.instructions);
            expect(res.body.ingredients).to.eql(testNewRecipe.ingredients);
          })
          .then(postRes =>
            supertest(app)
              .get(`/api/recipes/${postRes.body.id}`)
              .expect(postRes.body)
          );
      });
    });
  });




});