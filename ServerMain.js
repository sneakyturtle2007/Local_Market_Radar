// LIBRARIES: Express and Path
  var express = require('express');
  var https = require('https');
  var path = require('path');
  var fs = require('fs');
// LOCAL FILE IMPORTS: Handler.js
  var Search = require('./Backend_NodeJS_Files/Search.js');
  var Login = require('./Backend_NodeJS_Files/Login.js');
  var SignUp = require('./Backend_NodeJS_Files/SignUp.js');
// SERVER SETUP
  var app = express();

  app.set('view engine', 'ejs');

  app.set('views', path.join(__dirname, 'FrontEnd', 'Search'));

  app.use(express.static(path.join(__dirname, 'FrontEnd')));
  
// DYNAMIC PAGES SETUP

  // itempage 
    app.get('/Search', async function (req, res) {

      var items = await Search.getItems(0, '');
      console.log(items);
      var renderPage = function(){ res.render('Search',{items : items}); }
      renderPage();
      
    });

// STATIC PAGES SETUP
  
  // main page
    app.get('/', async function (req, res) {
      res.sendFile(path.join(__dirname, 'FrontEnd', 'MainPage.html'));
    });
  // login page
    app.get('/Login', async function (req, res) {
      res.sendFile(path.join(__dirname, 'FrontEnd', 'Login', 'Login.html'));
    });
  // account page
    app.get('/Account', async function (req, res) {
      res.sendFile(path.join(__dirname, 'FrontEnd', 'Account.html'));
    });
  // signup page
    app.get('/Signup', async function (req, res) {
      res.sendFile(path.join(__dirname, 'FrontEnd','SignUp', 'Signup.html'));
    });
// API SETUP

  // returns products for item page
    app.get('/api/items', async function (req, res) {
      var search = req.query.search;
      try{
        var items = await Search.getItems(0, search);
        res.json(items);
      }catch(err){
        console.log(err);
      }
      
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
    

// SERVER STARTUP

  const httpsOptions = {
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
  }
  const server = https.createServer(httpsOptions, app);

  const port = 443; 

  server.listen(port, () => {
    
    console.log('Server is running on port: ' + port);
  }).on('error', function(err) {
    console.log(err);
  });