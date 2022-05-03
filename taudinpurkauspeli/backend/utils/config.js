require('dotenv').config();

const {
  PORT,
  DB,
  DB_HOST,
  DB_USERNAME,
  DB_PASSWORD,
  USER_NAME,
  GROUP,
  STUDENTID,
  MAIL,
  SECRET,
  ADMINGROUP,
  FILEPATH,
} = process.env;

module.exports = {
  HOST: DB_HOST,
  USER: DB_USERNAME,
  PASSWORD: DB_PASSWORD,
  // eslint-disable-next-line object-shorthand
  DB: DB,
  dialect: 'postgres',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  ssl: true,
  PORT,
  USER_NAME,
  GROUP,
  STUDENTID,
  MAIL,
  SECRET,
  ADMINGROUP,
  FILEPATH,
};
