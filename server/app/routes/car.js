var express = require('express');
var router = express.Router();
var models = require('../models');
var resp = require('../lib/resp');
var dbtools = require('../lib/dbtools');

router.route('/')
  .get(function(req, res, next) {

    var user = req.user;
    if(user !== undefined) user = user.toJSON();

    dbtools.getOutputArray(
        'firm',
        user.firm_id,
        function(outputArray) {
            
            var sql = 
               `SELECT
                    a.*,
                    b.name as firm
                FROM car a
                    join firm b on a.firm_id = b.id
                WHERE
                    a.firm_id in (:oArray)`;
            
            models.sequelize.query(sql, { replacements: { oArray: outputArray }, type: models.sequelize.QueryTypes.SELECT })
                .then(
                function(values) {                    
                    res.json(resp({
                        data: values
                    }));
                }, 
                function(err) {
                    res.json(resp({
                        rslt: false,
                        msg: 'Не удалось получить список! Ошибка: ' + err.message
                    }));
                }
            );

        }
    );
});

router.route('/:id')
  .get(function(req, res, next) {

    var sql = 
        `SELECT 
            a.*, 
            b.name as firm 
        FROM car a 
            join firm b on a.firm_id = b.id
        WHERE
            a.id = :id`;
    
    models.sequelize.query(sql, { replacements: { id: parseInt(req.params.id) }, type: models.sequelize.QueryTypes.SELECT })
        .then(
        function(values) {                    
            res.json(resp({
                data: values[0]
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
    
    models.car.create(req.body).then(
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
      
    models.car.update(
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
      
    models.car.destroy({
            where: {
                id: parseInt( parseInt(req.params.id) )
            }
        }).then(
        function() {
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