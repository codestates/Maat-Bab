require('dotenv').config();
module.exports = {
  development: {
    username: process.env.DATABASE_DEVELOPMENT_USERNAME,
    password: process.env.DATABASE_DEVELOPMENT_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_DEVELOPMENT_HOST,
    dialect: 'mysql',
  },
  test: {
    username: process.env.DATABASE_DEVELOPMENT_USERNAME,
    password: process.env.DATABASE_DEVELOPMENT_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_DEVELOPMENT_HOST,
    dialect: 'mysql',
  },
  production: {
    username: process.env.DATABASE_PRODUCTION_USERNAME,
    password: process.env.DATABASE_PRODUCTION_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_PRODUCTION_HOST,
    port: process.env.DATABASE_PRODUCTION_PORT,
    dialect: 'mysql',
  },
};
