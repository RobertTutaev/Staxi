//var _ = require('lodash');
var resp = require('../config/resp.json');

module.exports = function(options) {
    /*var respChild = _.clone(resp);
    
    if (options != undefined) {
        _.forEach(options, (value, key) => {
            if (key in respChild) {
                respChild[key] = value;
            }
        })
    }

    return respChild;*/

    return Object.assign({}, resp, options);
};