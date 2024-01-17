var http = require('http');
var dt = require('./Handler');
var url = require('url');
var filesystem = require('fs');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  filesystem.readFile('FrontEnd/index.html', function(err, data) {
    res.write(data);
    return res.end();
  });
  
}).listen(8000);