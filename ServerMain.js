// LIBRARIES: Express and Path
  var express = require('express');
  var path = require('path');
// LOCAL FILE IMPORTS: Handler.js
  var ItemPage = require('./Handler.js');
// SERVER SETUP
  var app = express();

  app.set('view engine', 'ejs');

  app.set('views', path.join(__dirname, 'FrontEnd'));

  app.use(express.static(path.join(__dirname, 'FrontEnd')));

  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'FrontEnd', 'MainPage.html'));
  });

  app.listen(8000, function () {
    console.log('App listening on port 8000!');
  });
// PAGES SETUP

  // itempage 
  app.get('/itempage', function (req, res) {

    var items = ItemPage.getItems();

    var renderPage = function(){ res.render('itempage',{items : items}); }

    renderPage();
    
  });

