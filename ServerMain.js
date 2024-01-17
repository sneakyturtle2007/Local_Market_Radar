var http = require('http');
var dt = require('./Handler');
var url = require('url');
var filesystem = require('fs');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  
  
}).listen(8000);