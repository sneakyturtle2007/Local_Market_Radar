var express = require('express');
var path = require('path');
var filesystem = require('fs');
const mysql = require('mysql2');
var app = express();


app.use(express.static(path.join(__dirname, 'FrontEnd')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'FrontEnd', 'MainPage.html'));
});

app.get('/Handler.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'Handler.js'));
});

app.listen(8000, function () {
  console.log('App listening on port 8000!');
});




var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "Main"
});
var accresult;
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
 
}); 
con.query("SELECT * FROM accounts", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    accresult = result;
    
});


/*
server = http.createServer(function (req, res) {
  
  var urlPath = url.parse(req.url).pathname;
  
  var htmlFiles = ['Account.html', 'index.html', 'BetterFrontPage.html', 'Business_Page.html']

  if(urlPath == '/') {
    urlPath = path.join(urlPath, 'BetterFrontPage.html');
  }

  console.log(urlPath.substring(1));

  if (htmlFiles.includes(urlPath.substring(1))){
    var htmlpath = path.join(__dirname, 'FrontEnd', urlPath);

    console.log(htmlpath);

    filesystem.readFile(htmlpath, function(err, data) {
      if(err) console.log(err);
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
    
  }else if (urlPath === '/Handler.js') {
    filesystem.readFile('Handler.js', 'utf8', (err, data) => {
      if(err) console.log(err);
      res.writeHead(200, { 'Content-Type': 'application/javascript' });
      res.write(data);
      res.end();
    });
  }

}).listen(8000);
*/
