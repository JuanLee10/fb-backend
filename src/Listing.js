const db = require('./ListingCmd');

exports.getListings = async (req, res) => {
  const result = await db.getAll();
  res.status(200).json(result);
};

exports.getListingById = async (req, res) => {
  const result = await db.getById(req.params.id);
  res.status(200).json(result);
};

exports.getSearchedAndCatListings = async (req, res) => {
  const result = await db.getSearchedAndCategoryListings(req.query.category
    , req.query.search);
  res.status(200).json(result);
};

exports.getSearchedAndSubCatListings = async (req, res) => {
  const result = await db.
    getSearchedAndSubCategoryListings(
      req.query.subCategory,
      req.query.search,
    );
  res.status(200).json(result);
};

exports.selectSpecificFilter = async (req, res) => {
  const dbCall = await db.getSpecificListing(
    req.query.category,
    req.query.subCategory,
    req.query.minPrice,
    req.query.maxPrice,
  );
  if (dbCall) {
    res.status(200).send(dbCall);
  } else {
    res.status(404).send();
  }
};

exports.getLocation = async (req, res) => {
  const dbCall = await db.getSearchedAndSubCategoryLocationListings(
    req.query.category,
    req.query.subCategory,
    req.query.search,
    req.query.location,
  );
  if (dbCall.length !== 0) {
    res.status(200).send(dbCall);
  } else {
    res.status(404).send('getLocation failed');
  }
};
