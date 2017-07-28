var models = require('../models');
var tools = require('../lib/tools');
var resp = require('../lib/resp');

var emptyArrayValue = 0;

var getOutputArray = function(modelName, searchValue, callback) {
    
    models[modelName].findAll()
        .then(
        function(iArray) {

            var oArray = 
                    tools.getOutputArray({
                        searchValue: searchValue,
                        inputArray: iArray,
                        parentFieldName: 'id',
                        childFieldName: modelName + '_id'
                    });

            return callback( oArray.length ? oArray : [emptyArrayValue] );
        },
        function(err) {
            return callback([emptyArrayValue]);
        }
    );
}

var getOutputArrayForTerritory = function(searchValue, callback) {

    models.firm.findById(parseInt(searchValue))
        .then(
        function(value) {
            getOutputArray(
                'territory',
                value.territory_id,
                function(outputArray) {
                    return callback(outputArray);
                }
            );
        }, 
        function(err) {
            return callback([emptyArrayValue]);
        }
    );
}

module.exports = {
    getOutputArray: getOutputArray,
    getOutputArrayForTerritory: getOutputArrayForTerritory
}