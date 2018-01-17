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
            (value) => {
                getOutputArray(
                    'territory',
                    value.territory_id,
                    (outputArray) => callback(outputArray)
                );
            }, 
            (err) => callback([emptyArrayValue])
        );
}

var getTransportationCount = function(id, dt) {

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

    return models.sequelize.query(
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
            .then((values) => values[0].cnt);
}

var canTransportationChange = function(id, user) {

    // Ограничиваем или нет изменение/удаление заявок для пользователей и операторов (не для координаторов!)
    return models.transportation.findById(id)
        .then((value) => (value.status_id < 2 && (user.role0 || user.role2)) || user.role3 );
}

module.exports = {
    getOutputArray: getOutputArray,
    getOutputArrayForTerritory: getOutputArrayForTerritory,
    getTransportationCount: getTransportationCount,
    canTransportationChange: canTransportationChange
}