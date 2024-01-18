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

  console.log(urlPath.substring(1));

  if (htmlFiles.includes(urlPath.substring(1))){
    var htmlpath = path.join(__dirname, 'FrontEnd', urlPath);

    console.log(htmlpath);

    filesystem.readFile(htmlpath, function(err, data) {

      if(err) throw err;
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }

}).listen(8000);