const express = require('express');
const cors = require('cors');
const yaml = require('js-yaml');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');
const OpenApiValidator = require('express-openapi-validator');

const dummy = require('./dummy');
const auth = require('./auth');
const person = require('./Person');
const category = require('./categoryFilter');
const listing = require('./Listing');
const reply = require('./Replies');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const apiSpec = path.join(__dirname, '../api/openapi.yaml');

const apidoc = yaml.load(fs.readFileSync(apiSpec, 'utf8'));
app.use('/v0/api-docs', swaggerUi.serve, swaggerUi.setup(apidoc));
app.post('/authenticate', auth.authenticate);
app.post('/check', auth.check);

app.use(
  OpenApiValidator.middleware({
    apiSpec: apiSpec,
    validateRequests: true,
    validateResponses: true,
  }),
);

app.post('/v0/insertUser', person.insertUser);
app.get('/v0/dummy', dummy.get);
app.get('/v0/Listing', auth.check, listing.getListings);
app.get('/v0/display/:id', listing.getListingById);
app.get('/v0/replies/:id', reply.getReplies);
app.get('/v0/category', auth.check, category.selectCategory);
app.get('/v0/specificFilter', auth.check, listing.selectSpecificFilter);
app.get('/v0/search', auth.check, listing.getSearchedAndCatListings);
app.get('/v0/searchSub', auth.check, listing.getSearchedAndSubCatListings);
app.get('/v0/location', auth.check, listing.getLocation);

app.use((err, req, res, next) => {
  res.status(err.status).json({
    message: err.message,
    errors: err.errors,
    status: err.status,
  });
});

module.exports = app;
