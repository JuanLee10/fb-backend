
const bcrypt = require('bcrypt');
// const {Pool} = require('pg');

const db = require('./users.js');

// const pool = new Pool({
//   host: 'localhost',
//   port: 5432,
//   database: process.env.POSTGRES_DB,
//   user: process.env.POSTGRES_USER,
//   password: process.env.POSTGRES_PASSWORD,
// });

exports.insertUser = async (req, res) => {
  const {firstName, lastName, email, phone, password} = req.body;

  const encryptedPass = await bcrypt.hash(password, 3);
  const data = {
    'firstName': firstName,
    'lastName': lastName,
    'email': email,
    'phone': phone,
    'password': encryptedPass,
    'role': 'Admin',
  };
  await db.insertNewUser(data);
  res.status(200).json(data);
};


