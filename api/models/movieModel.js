'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MovieSchema = new Schema({
  idMovie:{
    type: Number
  },
  title: {
    type: String,
    required: 'Enter the title of the movie'
  },
  thumbnail: {
    type: String,
  },
  releaseDate: {
    type: Date,
    default: Date.now
  },
  genres: {
    type: Array,
  },
  rating: {
    type: Number,
  },
  country:{
    type: String,
  },
  category: {
    type: Boolean,
  },
  popularity: {
    type: Number,
  },
  synopsis: {
    type: String,
  },
  vote:{
    type: Number,
  }
});

module.exports = mongoose.model('Movies', MovieSchema);