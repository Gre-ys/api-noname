'use strict';
var fetch = require('cross-fetch');
var mongoose = require('mongoose'),
  Movie = mongoose.model('Movies');

exports.list_all_movies = function(req, res) {
  Movie.find({}, function(err, results) {
    if (err)
      res.send(err);
    res.json({results});
  });
};

/*exports.add_for_checks = function(req, res) {
  Movie.insertMany(req.body, function(err, movies) {
    if (err)
      res.send(err);
    res.json(movies);
  });
};*/

exports.create_a_movie = async function(req, res) {
  for(let i=1; i <= 5; i++){
    var tmdb = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=2ba1ea9298a74029941311c2c6a65e6e&language=en-US&page=${i}`);
    const tmdbJson = await tmdb.json();
    var raw = tmdbJson.results;
    raw.map((item)=>{
      fetch(`https://api.themoviedb.org/3/movie/${item.id}?api_key=2ba1ea9298a74029941311c2c6a65e6e&language=en-US`)
      .then((response)=>response.json())
      .then((detail)=>(
        {
          idMovie: detail.id,
          title: detail.original_title,
          thumbnail: detail.poster_path,
          releaseDate: detail.release_date,
          genres: detail.genres,
          rating: detail.vote_average,
          country: detail.production_countries[0].name,
          category: detail.adult,
          popularity: detail.popularity,
          synopsis: detail.overview,
          vote: detail.vote_count
        }
    )).then((movieDetail)=>{
      var new_movie = new Movie(movieDetail);
      new_movie.save();
      res.send("Success!");
    });
    });
  }
};

exports.read_a_movie = function(req, res) {
    Movie.findById(req.params.movieId, function(err, movie) {
    if (err)
      res.send(err);
    res.json(movie);
  });
};

exports.update_a_movie = function(req, res) {
    Movie.findOneAndUpdate({_id: req.params.movieId}, req.body, {new: true}, function(err, movie) {
    if (err)
      res.send(err);
    res.json(movie);
  });
};

exports.delete_a_movie = function(req, res) {
  Movie.remove({_id: req.params.movieId}, function(err, movie) {
      if (err)
      res.send(err);
      res.json({ message: 'Movie successfully deleted' });
    });
};

exports.list_all_movies_by_genre = function(req, res) {
    Movie.findById(req.params.genre, function(err, movie) {
    if (err)
      res.send(err);
    res.json(movie);
  });
};