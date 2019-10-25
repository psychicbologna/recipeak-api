process.env.TZ = 'UTC';
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'cc70a9f0-016c-4a7b-8260-f9800dcc89a7';
process.env.JWT_EXPIRY = '3m'
process.env.TEST_DB_URL = process.env.TEST_DB_URL || 'postgresql://recipeak@localhost/recipeak-api-test';

require('dotenv').config();
const { expect } = require('chai');
const supertest = require('supertest');

global.expect = expect;
global.supertest = supertest;