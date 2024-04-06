// LIBRARIES: Express and Path
  var express = require('express');
  var https = require('https');
  var path = require('path');
  var fs = require('fs');
// LOCAL FILE IMPORTS: Handler.js
  var Search = require('./Backend_NodeJS_Files/Search.js');
  var Login = require('./Backend_NodeJS_Files/Login.js');
  var SignUp = require('./Backend_NodeJS_Files/SignUp.js');
  var Profile = require('./Backend_NodeJS_Files/Profile.js');
// SERVER SETUP
  var app = express();

  app.set('view engine', 'ejs');

  app.set('views', path.join(__dirname,'Search'));

  app.use(express.static(path.join(__dirname)));
  
// DYNAMIC PAGES SETUP

  // search page
    app.get('/Search', async function (req, res) {
      
      //var items = await Search.getItems(0, '');
      //console.log(items);
      //var renderPage = function(){ res.render('Search',{items : items}); }
      //renderPage();
      res.sendFile(path.join(__dirname, 'Search', 'Search.html'));
    });
  // profile page
    app.get('/Profile', function (req, res) {
      res.sendFile(path.join(__dirname,'Profile', 'Profile.html'));
    });
  // item page
    app.get('/ItemPage', async function(red, res){
      res.sendFile(path.join(__dirname,'ItemPage', 'ItemPage.html'));
    });

// STATIC PAGES SETUP
  
  // main page
    app.get('/', function (req, res) {
      res.sendFile(path.join(__dirname, 'MainPage.html'));
    });
  // login page
    app.get('/Login', function (req, res) {
      res.sendFile(path.join(__dirname, 'Login', 'Login.html'));
    });
  // signup page
    app.get('/Signup', function (req, res) {
      res.sendFile(path.join(__dirname,'SignUp', 'Signup.html'));
    });
    
// API SETUP

  // returns products for item page
    app.get('/api/items', async function (req, res) {
      var search = req.query.search;
      
        var items = await Search.getItems(0, search);
        res.json(items);
    });
  
  // logging in
    app.get('/api/login', async function (req, res) {
      var username = req.query.username;
      var password = req.query.password;
      var result = await Login.login(username, password);
      res.json(result);
    });
  
  // signing up
    app.get('/api/signup', async function (req, res) {

      var username = req.query.username;
      var password = req.query.password;
      console.log(username);
      console.log(password);
      var result = await SignUp.signup(username, password);
      res.json(result);
    });
    
  // profile page
    app.get('/api/profile', async function (req, res) {
      console.log(req.query.username)
      console.log("debug");
      var username = req.query.username;
      var result = await Profile.getProfile(username);
      console.log(result);
      res.json(result);
    });

// SERVER STARTUP

  const httpsOptions = {
    key: fs.readFileSync('Certificates/server.key'),
    cert: fs.readFileSync('Certificates/server.cert')
  }
  const server = https.createServer(httpsOptions, app);

  const port = 443; 

  server.listen(port, () => {
    
    console.log('Server is running on port: ' + port);
  }).on('error', function(err) {
    console.log(err);
  });