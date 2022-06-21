const db = require('./categoryDB.js');


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
