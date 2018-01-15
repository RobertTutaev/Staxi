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

var getTransportationStatus = function(searchValue, callback) {

    models.transportation.findById(parseInt(searchValue))
        .then(
        function(value) {
            return callback(value.status);
        },
        function(err) {
            return callback(0);
        }
    );
}

var getTransportationCount = function(id, dt, callbackOk, callbackErr) {

    var year = dt.getFullYear();
    var aDt = new Date(year, 0, 1);
    var bDt = new Date(year, 12, 0);    
    var sql =
        `SELECT
            count(t.id) as cnt
        FROM 
            transportation t
        WHERE 
            t.client_id = :id AND 
            DATE(t.a_dt) BETWEEN DATE(:aDt) AND DATE(:bDt) AND 
            t.status_id = 3`;

    models.sequelize.query(
            sql, 
            { 
                replacements: { 
                    id: id,
                    aDt: aDt,
                    bDt: bDt
                }, 
                type: models.sequelize.QueryTypes.SELECT 
            }
        )
        .then(
        function(values) {
            return callbackOk(values[0].cnt);
        },
        function(err) {
            return callbackErr(err);
        }
    );
}

module.exports = {
    getOutputArray: getOutputArray,
    getOutputArrayForTerritory: getOutputArrayForTerritory,
    getTransportationStatus: getTransportationStatus,
    getTransportationCount: getTransportationCount
}