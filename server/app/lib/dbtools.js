var models = require('../models');
var tools = require('../lib/tools');
var resp = require('../lib/resp');
var config = require('../config/config.json')['global'];

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

var canTransportationAdd = function(transportation) {

    const id = transportation.client_id; 
    const dt = new Date(transportation.a_dt)
    const needCheckThis = transportation.status_id === 3;
    const year = dt.getFullYear();
    const aDt = new Date(year, 0, 1);
    const bDt = new Date(year, 12, 0);
    const sql =
        `SELECT
            count(t.id) as cnt
        FROM 
            transportation t
        WHERE 
            t.client_id = :id AND 
            DATE(t.a_dt) BETWEEN DATE(:aDt) AND DATE(:bDt) AND 
            t.status_id = 3`;

    if (needCheckThis)
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
                .then((values) => {
                    if (values[0].cnt < config.maxTransportationCountAdd) 
                        return
                    else
                        throw new Error(`Достигнуто максимальное количество заявок - ${config.maxTransportationCountAdd} шт.!`);
                });
    else
        return Promise.resolve();
}

var canTransportationChange = function(id, user) {
    //const 

    // Ограничиваем или нет изменение/удаление заявок для пользователей и операторов (не для координаторов!)
    return models.transportation.findById(id)
        .then((value) => {
            if ((value.status_id < 2 && (user.role0 || user.role2)) || user.role3)
                return
            else
                throw new Error('Отсутствуют права на изменение заявки!');
        });
}

module.exports = {
    getOutputArray: getOutputArray,
    getOutputArrayForTerritory: getOutputArrayForTerritory,
    canTransportationAdd: canTransportationAdd,
    canTransportationChange: canTransportationChange
}
