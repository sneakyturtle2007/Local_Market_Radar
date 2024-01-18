var http = require('http');
var path = require('path');
var url = require('url');
var filesystem = require('fs');
var handler = require('./Handler.js');
server = http.createServer(function (req, res) {
  
  var urlPath = url.parse(req.url).pathname;
  var htmlFiles = ['Account.html', 'index.html', 'BetterFrontPage.html', 'Business_Page.html']
  if(urlPath == '/') {
    urlPath = path.join(urlPath, 'index.html');
  }
  if (urlPath in htmlFiles){
    var htmlpath = path.join(__dirname, 'FrontEnd', urlPath);

    console.log(htmlpath);

    filesystem.readFile(htmlpath, function(err, data) {

      if(err) throw err;
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }
  
  
  //res.writeHead(200, {'Content-Type': 'text/html'});
  //res.write();
  //res.end(handler.importHtmlFiles(res));
  //var urlPath = url.parse(req.url).pathname;
  //var htmlPath = path.join( 'FrontEnd/', urlPath, '.html');
}).listen(8000);