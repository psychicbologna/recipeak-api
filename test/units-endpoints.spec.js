const knex = require('knex'),
  app = require('../src/app'),
  helpers = require('./test-helpers'),
  config = require('../src/config');

describe('Units Endpoints', function () {
  let db;

  const { testUnits } = helpers.makeRecipesFixtures();
  const testUnit = testUnits[0];

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

  describe('GET /units', () => {
    context('There are no units in database.', () => {
      it(`responds with a status 404, 'Sorry, the units don't exist' `, () => {
        return supertest(app)
          .get('/api/units')
          .expect(404, { error: `Sorry, the units don't exist` });
      });
    });
    context('There are some units in the database.', () => {
      it(`responds with a sorted list of units.`)
    });

  });

  describe('GET /units/:unit_set', () => {
    it(`responds with a status 404, 'Sorry, that unit doesn't exist' `, () => {
      return supertest(app)
        .get(`/api/units/${testUnit.unit_set}`)
        .expect(404, { error: `Sorry, that unit doesn't exist` });
    });
  });

});