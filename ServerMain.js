var express = require('express');
var app = express();
var path = require('path');
//const mysql = require('mysql2');

class item{
  constructor(name, price, stock, description, image){
    this.name = name;
    this.price = price;
    this.stock = stock;
    this.description = description;
    this.image = image;
  }
}
function createItem(name, price, description, image){
  return new item(name, price, description, image);
}

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'FrontEnd'));

app.use(express.static(path.join(__dirname, 'FrontEnd')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'FrontEnd', 'MainPage.html'));
});

app.get('/itempage', function (req, res) {
  var items = [];
  for(var i = 0; i < 10; i++){
    items.push(createItem('Item' + i, 100 + i, 0,  'This is item ' + i, "https://i.ytimg.com/vi/_3OUQTruQRE/maxresdefault.jpg" ));
  }


  res.render('itempage',{items : items});
});


/*
app.get('/Handler.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'Handler.js'));
});
*/

app.listen(8000, function () {
  console.log('App listening on port 8000!');
});



/*
con.connect((err) => {
  if (err) return console.error(err.message); 
});  

function availableItems(){
  app.get('/Products', (req, res) => {
    con.query("SELECT * FROM products", (err, result, fields) => {
      if (err) throw err;
      res.json(result);
    });
  });
}

module.exports = availableItems;*/


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
