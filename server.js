var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Movie = require('./api/models/movieModel'),
  Compare = require('./api/models/compareModel'),
  ComparisonResults = require('./api/models/cmprResultsModel'), //created model loading here
  bodyParser = require('body-parser');
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/NoNameDB'); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/nonameRoutes'); //importing routes
routes(app); //register the route

app.listen(port);

console.log('NoName RESTful API server started on: '+port);