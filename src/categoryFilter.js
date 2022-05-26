const db = require('./categoryDB.js');

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imp1YW5sZWVAZ21h
// aWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjM4NDQ0MTg1LCJleHAiOjE2N
// DAyNDQxODV9.NzAxn2xjETI4-gqtK6rSIdRiv7Ob-z6r7D_ea5W4K9Y
exports.selectCategory = async (req, res) => {
  const category = await db.filterCategory();
  const categories = [];

  category.map((cat) => {
    categories.push(
      {
        'name': cat.categoryname,
        'filters': cat.filters,
        'subcategories': cat.subcategories,
      },
    );
  });
  // console.log(categories);
  res.status(200).send(categories);
};
