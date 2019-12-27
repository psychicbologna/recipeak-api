module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  //CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://recipeak@localhost/recipeak',
  TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || 'postgresql://recipeak@localhost/recipeak-test',
  JWT_SECRET: process.env.JWT_SECRET || 'cc70a9f0-016c-4a7b-8260-f9800dcc89a7',
  JWT_EXPIRY: process.env.JWT_EXPIRY || '8h'
};
