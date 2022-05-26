require('dotenv').config();
const app = require('./app.js');

app.listen(process.env.PORT || 3010, () => {
  console.log(`Server Running on port 3010`);
  console.log('API Testing UI: https://fakefacebookmarketplace-be.herokuapp.com/v0/api-docs/');
});
