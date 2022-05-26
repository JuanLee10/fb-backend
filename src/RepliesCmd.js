const {Pool} = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});


exports.getByListingId = async (id) => {
  const select = `SELECT replies.*, Person.info FROM replies inner join
    Person on Person.id = replies.PersonId where replies.ListingId = $1`;
  const query = {
    text: select,
    values: [id],
  };
  const {rows} = await pool.query(query);
  const listings = rows;
  return listings;
};
