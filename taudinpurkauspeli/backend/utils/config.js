require('dotenv').config();

const {
  PORT,
  DB_HOST,
  DB_USERNAME,
  DB_PASSWORD,
  USER_NAME,
  GROUP,
  STUDENTID,
  MAIL,
  SECRET,
} = process.env;

module.exports = {
  HOST: DB_HOST,
  USER: DB_USERNAME,
  PASSWORD: DB_PASSWORD,
  DB: 'taudinpurkaus',
  dialect: 'postgres',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  PORT,
  USER_NAME,
  GROUP,
  STUDENTID,
  MAIL,
  SECRET,
};
