const {pool} = require("pool.js");

exports.allUsersInfo = async () => {
  const select = 'SELECT info FROM person';
  const query = {
    text: select,
    values: [],
  };
  const {rows} = await pool.query(query);
  const users = rows;
  return users;
};

exports.insertNewUser = async (info) => {
  const insert = 'Insert into person (info) values ($1)';
  const query = {
    text: insert,
    values: [info],
  };
  await pool.query(query);
};
