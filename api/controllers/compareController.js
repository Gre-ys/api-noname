'use strict';
var fetch = require('cross-fetch');
var mongoose = require('mongoose'),
  Compare = mongoose.model('Compare');

exports.list = function(req, res) {
  Compare.find({}, function(err, results) {
    if (err)
      res.send(err);
    res.json({results});
  });
};

exports.input_compare = async function(req, res) {
  var compareData = await fetch('http://localhost:3000/compare');
  const compareDataJson = await compareData.json();
  //console.log(compareDataJson);
  var n = compareDataJson.results.length;
  if(n>0){
    Compare.remove({}, function(err, results) {
      if (err)
        res.send(err);
      console.log('Compares successfully deleted');
    });
  }
  var new_compare = new Compare(req.body);
  new_compare.save(function(err, compare) {
    if (err)
      res.send(err);
    res.json(compare);
  });
};

exports.delete_input_user = function(req, res) {
  Compare.remove({_id: req.params.compareId}, function(err, compare) {
    if (err)
    res.send(err);
    res.json({ message: 'Compare successfully deleted' });
  });
};

exports.delete_compare = function(req, res) {
  Compare.remove({}, function(err, results) {
    if (err)
      res.send(err);
    res.json({ message: 'Compares successfully deleted' });
  });
};