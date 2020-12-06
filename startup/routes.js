const express = require('express');
const genres = require('../routes/genres');
const customers = require('../routes/customers');
const movies = require('../routes/movies');
const rentals = require('../routes/rentals');
const uploads = require('../routes/uploads');
const users = require('../routes/users');
const auth = require('../routes/auth');
const returns = require('../routes/returns');
const images = require('../routes/images');
const error = require('../middleware/error');

module.exports = function (app) {
  app.use(express.json());
  app.use('/api/genres', genres);
  app.use('/api/customers', customers);
  app.use('/api/movies', movies);
  app.use('/api/rentals', rentals);
  app.use('/api/upload', uploads);
  app.use('/api/images', images)
  app.use('/api/users', users);
  app.use('/api/auth', auth);
  app.use('/api/returns', returns);
  app.use(error);
}