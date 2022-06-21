const {Pool} = require('pg');

const {POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, HOST} = require('constants.js');

export const pool = new Pool({
  host: HOST,
  port: 5432,
  database: POSTGRES_DB,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
});