//* **************************************
// DO NOT MODIFY THIS FILE
//* **************************************

const fs = require('fs');
const {Pool} = require('pg');

require('dotenv').config();
const POSTGRES_DB='test';
const {HOST} = require('constants.js');

const pool = new Pool({
  host: HOST,
  port: 5432,
  database: POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

const run = async (file) => {
  const content = fs.readFileSync(file, 'utf8');
  const statements = content.split(/\r?\n/);
  for (statement of statements) {
    await pool.query(statement);
  }
};

exports.reset = async () => {
  await run('sql/schema.sql');
  await run('sql/data.sql');
  await run('sql/indexes.sql');
};
