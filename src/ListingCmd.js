const {Pool} = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

exports.getAll = async () => {
  const select = 'SELECT id, content, subcategories FROM listing';
  const {rows} = await pool.query(select);
  const listings = rows;
  return listings;
};

exports.getById = async (id) => {
  const select = 'SELECT * from listing where id = $1';
  const query = {
    text: select,
    values: [id],
  };
  const {rows} = await pool.query(query);
  const listings = rows;
  return listings;
};

exports.getSearchedAndCategoryListings = async (category, search) => {
  let select = 'select id, content, subcategories from listing';
  let query;
  if (category !== undefined && search === undefined) {
    select += ' where (content ->> \'Category\' = $1)';
    query = {
      text: select,
      values: [category],
    };
  } else if (category === undefined && search !== undefined) {
    select += ' where (content->>\'title\' ~* $1)';
    query = {
      text: select,
      values: [search],
    };
  } else if (category !== undefined && search !== undefined) {
    select += ` where (content->>'title' ~* $1)
      AND (content ->> 'Category' = $2)`;
    query = {
      text: select,
      values: [search, category],
    };
  } else {
    query = select;
  }
  const {rows} = await pool.query(query);
  const listings = rows;
  return listings;
};

exports.getSearchedAndSubCategoryListings = async (subCategory, search) => {
  let select = 'select id, content, subcategories from listing';
  let query;
  if (subCategory !== undefined && search === undefined) {
    query = select;
  } else if (subCategory === undefined && search !== undefined) {
    select += ' where (content->>\'title\' ~* $1)';
    query = {
      text: select,
      values: [search],
    };
  } else {
    select += ' where (content->>\'title\' ~* $1)';
    query = {
      text: select,
      values: [search],
    };
  }
  const {rows} = await pool.query(query);

  if (subCategory !== undefined) {
    const listings = rows;
    const results = listings
      .filter((object) => object.subcategories.includes(subCategory));
    return results;
  } else {
    return rows;
  }
};

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdhcmV0aHNh
// bWFAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjM4NDI2MTY3LC
// JleHAiOjE2NDAyMjYxNjd9.Nj_4vhMo7OmQDFk_PoePL8S1wsy2cPuq97Cqn0BBfmg
exports.getSpecificListing = async (
  category, subCategory, minPrice, maxPrice,
) => {
  if (minPrice > maxPrice) {
    return undefined;
  }

  let select = `SELECT * FROM listing WHERE content ->> 'Category' ~* $1`;
  let query = {
    text: select,
    values: [category],
  };

  if (minPrice && maxPrice) {
    select = `SELECT * FROM listing WHERE content ->> 'Category' ~* $1
      AND CAST(content ->> 'price' as INT) >= CAST($2 as INT) 
      AND CAST(content ->> 'price' as INT) <= CAST($3 as INT)`;
    query = {
      text: select,
      values: [category, minPrice, maxPrice],
    };
  } else if (minPrice && maxPrice === undefined) {
    select = `SELECT * FROM listing WHERE content ->> 'Category' ~* $1
      AND CAST(content ->> 'price' as INT) >= CAST($2 as INT)`;
    query = {
      text: select,
      values: [category, minPrice],
    };
  // } else if ( minPrice === undefined && maxPrice) {
  //   select = `SELECT * FROM listing WHERE content ->> 'Category' ~* $1
  //     AND CAST(content ->> 'price' as INT) <= CAST($2 as INT)`;
  //   query = {
  //     text: select,
  //     values: [category, maxPrice],
  //   };
  }

  const {rows} = await pool.query(query);
  if (subCategory !== undefined) {
    const listings = rows;
    const results = listings
      .filter((object) => object.subcategories.includes(subCategory));
    return results;
  } else {
    return rows;
  }
};

exports.getSearchedAndSubCategoryLocationListings = async (
  category, subCategory, search, location,
) => {
  let select = `select id,content,subcategories from listing
    WHERE (content->>'Location' ~* $1)`;
  let query = {
    text: select,
    values: [location],
  };

  if (search === undefined && category !== undefined) {
    select += ' AND (content->>\'Category\' ~* $2)';
    query = {
      text: select,
      values: [location, category],
    };
  } else if (search !== undefined && category === undefined) {
    select += ' AND (content->>\'title\' ~* $2)';
    query = {
      text: select,
      values: [location, search],
    };
  } else if (search !== undefined && category !== undefined) {
    select += ` AND (content->>'title' ~* $2) AND (content->>'Category' ~* $3)`;
    query = {
      text: select,
      values: [location, search, category],
    };
  }
  const {rows} = await pool.query(query);

  if (subCategory !== undefined) {
    const listings = rows;
    const results = listings
      .filter((object) => object.subcategories.includes(subCategory));
    return results;
  } else {
    return rows;
  }
};
