// LIBRARIES: Express and Path
  var express = require('express');
  var https = require('https');
  var path = require('path');
  var fs = require('fs');
// LOCAL FILE IMPORTS: Handler.js
  var ItemPage = require('./FrontEnd_JavascriptFiles/ItemPage.js');
  var Login= require('./FrontEnd_JavascriptFiles/Login.js');
// SERVER SETUP
  var app = express();

  app.set('view engine', 'ejs');

  app.set('views', path.join(__dirname, 'FrontEnd'));

  app.use(express.static(path.join(__dirname, 'FrontEnd')));

  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'FrontEnd', 'MainPage.html'));
  });

  
// DYNAMIC PAGES SETUP

  // itempage 
    app.get('/itempage', async function (req, res) {

      var items = await ItemPage.getItems(0, '');
      console.log(items);
      var renderPage = function(){ res.render('itempage',{items : items}); }
      renderPage();
      
    });

// REGULAR PAGES SETUP

  // login page
    app.get('/Login', async function (req, res) {
      res.sendFile(path.join(__dirname, 'FrontEnd', 'Login.html'));
    });
  // Account Page
    app.get('/Account', async function (req, res) {
      res.sendFile(path.join(__dirname, 'FrontEnd', 'Account.html'));
    });
  
// API SETUP

  // returns products for item page
    app.get('/api/items', async function (req, res) {
      var search = req.query.search;
      try{
        var items = await ItemPage.getItems(0, search);
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