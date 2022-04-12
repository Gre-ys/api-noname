'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CompareSchema = new Schema({
  stringCompare:{
    type: Array
  },
  compareValue:{
    type: Array
  }
});

module.exports = mongoose.model('Compare', CompareSchema);