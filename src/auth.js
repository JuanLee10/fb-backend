const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// const {Pool} = require('pg');

const {accessToken} = require('constants.js');


const db = require('./users.js');

// const pool = new Pool({
//   host: 'localhost',
//   port: 5432,
//   database: process.env.POSTGRES_DB,
//   user: process.env.POSTGRES_USER,
//   password: process.env.POSTGRES_PASSWORD,
// });

exports.authenticate = async (req, res) => {
  const {email, password} = req.body;
  const users = await db.allUsersInfo();

  const user = users.find((user) => {
    return user.info['email'] === email &&
    bcrypt.compareSync(password, user.info['password']);
  });

  if (user) {
    const accessTokens = jwt.sign(
      {email: user.info.email, role: user.info.role},
      accessToken, {
        expiresIn: '30000m',
        algorithm: 'HS256',
      });
    console.log(accessTokens);
    res.status(200)
      .json({
        firstName: user.info['firstName'],
        lastName: user.info['lastName'],
        accessToken: accessTokens,
      });
  } else {
    res.status(401).send('Username or password incorrect');
  }
};

exports.check = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, accessToken, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

