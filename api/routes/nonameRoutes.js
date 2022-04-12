'use strict';
module.exports = function(app) {
  var movieList = require('../controllers/movieController');
  var compare = require('../controllers/compareController');
  var cmprResultsController = require('../controllers/cmprResultsController');

  // movieList Routes
  app.route('/movies')
    .get(movieList.list_all_movies)
    .post(movieList.create_a_movie);

  /*app.route('/moviesCheck')
    .post(movieList.add_for_checks);*/

  app.route('/movies/:movieId')
    .get(movieList.read_a_movie)
    .put(movieList.update_a_movie)
    .delete(movieList.delete_a_movie);
    
  app.route('/genres/:genre')
    .get(movieList.list_all_movies_by_genre);
    
  // compare Routes
  app.route('/compare')
    .get(compare.list)
    .post(compare.input_compare)
    .delete(compare.delete_compare);

  app.route('/compare/:compareId')
    .delete(compare.delete_input_user);
  
  // comparison Routes
  app.route('/comparisonResults')
    .get(cmprResultsController.comparisonResults)
    .post(cmprResultsController.input_comparison_results)
    .delete(cmprResultsController.delete_comparison);
   
  app.route('/comparisonCheck')
    .get(cmprResultsController.comparisonCheck)
};
