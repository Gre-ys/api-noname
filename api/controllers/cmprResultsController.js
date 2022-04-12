'use strict';
var fetch = require('cross-fetch');
var childProcess = require('child_process');
var mongoose = require('mongoose'),
    ComparisonResults = mongoose.model('ComparisonResults');

exports.comparisonCheck = function(req, res) {
  ComparisonResults.find({}, function(err, results) {
    if (err)
      res.send(err);
    res.json({results});
  });
};

exports.input_comparison_results = function(req, res) {
  //var new_cmprResults = new ComparisonResults(req.body);
  ComparisonResults.insertMany(req.body, function(err, cmprResults) {
    if (err)
      res.send(err);
    res.json(cmprResults);
  });
};

exports.delete_comparison = function(req, res) {
  ComparisonResults.remove({}, function(err, results) {
    if (err)
      res.send(err);
    res.json({ message: 'Comparison results successfully deleted' });
  });
};

exports.comparisonResults = async function(req, res) {
  var comparisonData = await fetch('http://localhost:3000/comparisonCheck');
  const cmprDataJson = await comparisonData.json();
  //console.log(cmprDataJson);
  var n = cmprDataJson.results.length;
  if(n>0){
    ComparisonResults.remove({}, function(err, results) {
      if (err)
        res.send(err);
      console.log('Comparison results successfully deleted');
    });
  }
  function runScript(scriptPath, callback) {
    // keep track of whether callback has been invoked to prevent multiple invocations
    var invoked = false;
    var process = childProcess.fork(scriptPath);
    // listen for errors as they may prevent the exit event from firing
    process.on('error', function (err) {
        if (invoked) return;
        invoked = true;
        callback(err);
    });
    // execute the callback once the process has finished running
    process.on('exit', function (code) {
        if (invoked) return;
        invoked = true;
        var err = code === 0 ? null : new Error('exit code ' + code);
        callback(err);
    });
  }

  // Now we can run a script and invoke a callback when complete, e.g.
  runScript('./filmAHP/index.js', function (err) {
    if (err) throw err;
    console.log('finished running AHP scripts...');
    var limitData = 3;
    var query = ComparisonResults.find().limit(limitData);
    query.exec(async function(err, cmprResults) {
      if (err)
        res.send(err);
      var raw = cmprResults;
      var results = [];
      for(let i = 0; i < raw.length; i++){
        var detail = await fetch(`http://localhost:3000/movies/${raw[i].idMng}`);
        const detailJson = await detail.json();
        detailJson.rank = raw[i].rank;
        detailJson.scoreResult = raw[i].scoreResult;
        results.push(detailJson);
        }
      res.json({results});
    });
  });
};