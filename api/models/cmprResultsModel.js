'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ComparisonResultsSchema = new Schema({
    rank:{
        type: Number
    },
    idMng:{
        type: String
    },
    idMovie:{
        type: Number
    },
    scoreResult:{
        type: Number
    }
});
  
module.exports = mongoose.model('ComparisonResults', ComparisonResultsSchema);