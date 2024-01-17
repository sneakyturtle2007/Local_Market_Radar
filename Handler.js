var dt = require('./Handler');
var url = require('url');
var filesystem = require('fs');

exports.importHtmlFiles = function (res) {
    filesystem.readFile('FrontEnd/index.html', function(err, data) {
        res.write(data);
    });
    filesystem.readFile('FrontEnd/BetterFrontPage.html', function(err, data) {
        res.write(data);
    });
    filesystem.readFile('FrontEnd/Business_Page.html', function(err, data) {
        res.write(data);
    });
    filesystem.readFile('FrontEnd/Account.html', function(err, data) {
        res.write(data);
    });
    return res.end();
};