var express = require('express');
var router = express.Router();
var models = require('../models');
var resp = require('../lib/resp');
var tools = require('../lib/tools');

router.route('/')
  .get(function(req, res, next) {
    
    var user = req.user;
    if(user !== undefined) user = user.toJSON();    

    var sql_prepare = 
        "SELECT b.territory_id " +
        "FROM user a " +
            "join firm b on a.firm_id = b.id " +
        "WHERE " +
            "a.id = : id";
    
    models.sequelize.query(sql_prepare, { replacements: { id: user.id }, type: models.sequelize.QueryTypes.SELECT })
        .then(
        function(iArray) {            

            var sValue = user.territory_id;
            
            var outputArray = tools.getOutputArray({
                    searchValue: sValue,
                    inputArray: iArray,
                    parentFieldName: 'id',
                    childFieldName: 'territory_id'
                });

            var sql = 
                "SELECT a.*, " +
                    "b.name as territory " +
                "FROM territory a " +
                    "left join territory b on a.territory_id = b.id " +
                "WHERE " +
                    "a.territory_id in (:oArray)";
            
            models.sequelize.query(sql, { replacements: { oArray: outputArray }, type: models.sequelize.QueryTypes.SELECT })
                .then(
                function(values) {
                    res.json(resp({
                        data: values
                    }));},
                function(err) {
                    res.json(resp({
                        rslt: false,
                        msg: 'Не удалось получить список! Ошибка: ' + err.message
                    }));
                }
            );

        }, 
        function(err) {
            res.json(resp({
                rslt: false,
                msg: 'Не удалось получить список! Ошибка: ' + err.message
            }));
        }
    );
});

router.route('/:id')
  .get(function(req, res, next) {
    
    models.territory.findById(parseInt(req.params.id))
        .then(
        function(value) {
            res.json(resp({                
                data: value
            }));
        }, 
        function(err) {
            res.json(resp({
                rslt: false,
                msg: 'Не удалось получить список! Ошибка: ' + err.message
            }));
        }
    );
});

router.route('/')
  .post(function(req, res) {
      
    models.territory.create(req.body).then(
        function(value) {
            res.json(resp({
                data: value
            }));
        },
        function(err) {
            res.json(resp({
                rslt: false,
                msg: 'Не удалось добавить! Ошибка: ' + err.message
            }));
        }
    );
});

router.route('/:id')
  .put(function(req, res, next) {
      
    models.territory.update(
        req.body,
        {
            where: {
                id: parseInt( parseInt(req.params.id) )
            }
        }).then(
        function(values) {
            res.json(resp({
                data: values
            }));
        },
        function(err) {
            res.json(resp({
                rslt: false,
                msg: 'Не удалось изменить! Ошибка: ' + err.message
            }));
        }
    );
});

router.route('/:id')
  .delete(function(req, res, next) {
      
    models.territory.destroy({
            where: {
                id: parseInt( parseInt(req.params.id) )
            }
        }).then(
        function() {
            console.log(resp());
            res.json(resp());
        }, 
        function(err) {
            res.json(resp({
                rslt: false,
                msg: 'Не удалось удалить! Ошибка: ' + err.message
            }));
        }
    );
});

module.exports = router;