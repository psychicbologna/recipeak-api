const knex = require('knex'),
  app = require('../src/app'),
  helpers = require('./test-helpers');

describe.only('Users Endpoints', function () {
  let db;

  const { testUsers } = helpers.makeRecipesFixtures(),
    testUser = testUsers[0];

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

  describe('POST /api/users', () => {
    context('User Validation', () => {
      beforeEach('insert users', () =>
        helpers.seedUsers(
          db,
          testUsers,
        )
      );

      const requireFields = ['username', 'password', 'first_name', 'last_name'];

      requireFields.forEach(field => {
        const registerAttemptBody = {
          username: 'test username',
          password: 'test password',
          first_name: 'test first_name',
          last_name: 'test last_name',
        };

        it(`responds with 400 required error when '${field}' is missing`, () => {
          delete registerAttemptBody[field];

          return supertest(app)
            .post('/api/users')
            .send(registerAttemptBody)
            .expect(400, {
              error: `Missing '${field}' in request body`,
            });
        });
      });
      it(`responds 400 'Password must be longer than 8 characters' when empty password`, () => {
        const userShortPassword = {
          username: 'test username',
          password: '1234567',
          first_name: 'test first_name',
          last_name: 'test last_name',
        };
        return supertest(app)
          .post('/api/users')
          .send(userShortPassword)
          .expect(400, { error: 'Password must be longer than 8 characters' });
      });
      it(`responds 400 error when password starts with spaces`, () => {
        const userPasswordStartsSpaces = {
          username: 'test user_name',
          password: ' 1Aa!2Bb@',
          first_name: 'test first_name',
          last_name: 'test last_name',
        };
        return supertest(app)
          .post('/api/users')
          .send(userPasswordStartsSpaces)
          .expect(400, { error: `Password must not start or end with empty spaces` });
      });
      it(`responds 400 error when password ends with spaces`, () => {
        const userPasswordEndsSpaces = {
          username: 'test user_name',
          password: '1Aa!2Bb@ ',
          first_name: 'test first_name',
          last_name: 'test last_name',
        };
        return supertest(app)
          .post('/api/users')
          .send(userPasswordEndsSpaces)
          .expect(400, { error: `Password must not start or end with empty spaces` })
      });
      it(`responds 400 error when password isn't complex enough`, () => {
        const userPasswordNotComplex = {
          username: 'test user_name',
          password: '11AAaabb',
          first_name: 'test first_name',
          last_name: 'test last_name',
        };
        return supertest(app)
          .post('/api/users')
          .send(userPasswordNotComplex)
          .expect(400, { error: `Password must contain 1 upper case, lower case, number and special character` });
      });
      it.only(`responds 400 'User name already taken' when username isn't unique`, () => {
        const duplicateUser = {
          username: testUser.username,
          password: '11AAaa!!',
          first_name: 'test first_name',
          last_name: 'test last_name',
        };
        return supertest(app)
          .post('/api/users')
          .send(duplicateUser)
          .expect(400, { error: `Username already taken` });
      });
    });
  });

});