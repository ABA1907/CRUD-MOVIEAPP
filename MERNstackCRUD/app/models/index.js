// dbConfig = where we call our database with url mongodb://localhost:27017
const dbConfig = require('../config/db.config');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.movies = require("./movies.model")(mongoose);

module.exports = db;