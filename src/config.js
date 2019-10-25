module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DB_URL: process.env.DB_URL || 'postgresql://recipeak@localhost/recipeak-api',
  JWT_SECRET: process.env.JWT_SECRET || 'cc70a9f0-016c-4a7b-8260-f9800dcc89a7',
  JWT_EXPIRY: process.env.JWT_EXPIRY || '20s'
};
