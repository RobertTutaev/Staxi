
var _ = require('lodash');
var fs = require('fs');
var excluded = ['index'];

module.exports = function(app) {
  fs.readdirSync(__dirname).forEach(function(file) {
    // Remove extension from file name
    var basename = file.split('.')[0];
    
    // Autentification routes
    app.use(require('./_auth.js'));

    // Only load files that aren't directories and aren't blacklisted
    if (!fs.lstatSync(__dirname + '/' + file).isDirectory() && 
        !_.includes(excluded, basename) &&
        file.charAt(0) !== '_' ) {
            app.use('/api/' + basename, require('./' + file));
    }
  });
};