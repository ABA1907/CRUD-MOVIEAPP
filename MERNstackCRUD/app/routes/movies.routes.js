module.exports = app => {
  const movies = require('../controllers/movie.controller');

  var router = require('express').Router();

  router.post('/',movies.create);
  router.get('/',movies.findAll);
  router.get('/published',movies.findAllPublished);
  router.get('/:id',movies.findOne);
  router.put('/:id',movies.update);
  router.delete('/:id',movies.delete);
  router.delete('/',movies.deleteAll);
  
  app.use('/api/movies',router);
};