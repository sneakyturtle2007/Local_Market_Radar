
var url = require('url');
var filesystem = require('fs');

exports.importHtmlFiles = function (res) {
    filesystem.readFile('FrontEnd/index.html', function(err, data) {
        if(err) throw err;
        
        return data;
    });  
};