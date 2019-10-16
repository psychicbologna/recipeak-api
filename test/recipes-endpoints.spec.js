const knex = require('knex'),
  { makeRecipesArray, makeMaliciousRecipe } = require('../recipes.fixtures'),
  app = require('../src/app')

describe('Recipes Endpoints', () => {
  let db;

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    });
    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());

  before('cleanup', () => db('bookmarks').truncate());

  afterEach('cleanup', () => db('bookmarks').truncate());

  describe('GET /api/recipes', () => {
    context('Given no recipes', () => {
      it('responds with 200 and an empty list', () => {
        return supertest(app)
          .get('api/articles')
          .expect(200, []);
      });
    });
  });

});