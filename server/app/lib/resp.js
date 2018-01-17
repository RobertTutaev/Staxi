var resp = require('../config/resp.json');

module.exports = function(options) {    
    return Object.assign({}, resp, options);
};