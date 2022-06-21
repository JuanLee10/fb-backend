const {pool} = require("pool.js");

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdhcmV0aHNhbWFAZ
// 21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjM4NDI2MTY3LCJleHAiOjE
// 2NDAyMjYxNjd9.Nj_4vhMo7OmQDFk_PoePL8S1wsy2cPuq97Cqn0BBfmg
exports.filterCategory = async () => {
  const select = 'SELECT * FROM category';
  const {rows} = await pool.query(select);
  const categories = [];
  for (const row of rows) {
    categories.push(row);
  }
  return categories;
};
