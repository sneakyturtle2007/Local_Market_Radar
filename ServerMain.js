var express = require('express');
var app = express();
var path = require('path');

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('MainPage');
});

app.listen(8000, function () {
  console.log('App listening on port 8000!');
});

const mysql = require('mysql2');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "Main"
});
console.log("hello")
var sql = "SELECT * FROM accounts";
var resultFinal;
con.connect((err) => {
  if (err) return console.error(err.message); 
  con.query(sql, [true], (error, results, fields) => {
    if (error) return console.error(error.message);
    resultFinal = results;
  });
});  

console.log(resultFinal);
while(resultFinal === undefined){
  if(resultFinal !== undefined){
    return resultFinal;
  }
} 

console.log(accounts());
module.exports = accounts;


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
