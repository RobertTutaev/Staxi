var express = require('express');
var router = express.Router();
var models = require('../models');
var resp = require('../lib/resp');
var dbtools = require('../lib/dbtools');

router.route('/')
  .get(function(req, res, next) {

    var user = req.user;
    if (user !== undefined) user = user.toJSON();

    dbtools.getOutputArrayForTerritory(
        user.firm_id, 
        function(outputArray) {

            var nameValue = '%' + (req.query.name ? req.query.name.replace(/[^-a-zA-Zа-яА-ЯёЁ0-9\., \(\):]/gim,'') : '') + '%';
            var sql =
                `SELECT a.*,
                    b.name as territory
                FROM street a
                    join territory b on a.territory_id = b.id
                WHERE
                    lower(concat(b.name,', ',a.socr,' ',a.name)) like lower(:name) AND
                    a.territory_id in (:oArray)
                LIMIT 20`;
            
            models.sequelize.query(
                sql, 
                { 
                    replacements: {
                        name: nameValue, 
                        oArray: outputArray 
                    }, 
                    type: models.sequelize.QueryTypes.SELECT 
                })
                .then(
                    (values) =>                   
                        res.json(resp({
                            data: values
                        })), 
                    (err) =>
                        res.json(resp({
                            rslt: false,
                            msg: 'Не удалось получить список! Ошибка: ' + err.message
                        }))
                );
        }
    );
});

router.route('/:id')
  .get(function(req, res, next) {
    
    models.street.findById(parseInt(req.params.id))
        .then(
            (value) =>
                res.json(resp({                
                    data: value
                })), 
            (err) =>
                res.json(resp({
                    rslt: false,
                    msg: 'Не удалось получить список! Ошибка: ' + err.message
                }))
        );
});

router.route('/')
  .post(function(req, res) {
    models.street.create(req.body)
        .then(
            (value) =>
                res.json(resp({
                    data: value
                })),
            (err) =>
                res.json(resp({
                    rslt: false,
                    msg: 'Не удалось добавить! Ошибка: ' + err.message
                }))
        );
});

router.route('/:id')
  .put(function(req, res, next) {
      
    models.street.update(
        req.body,
        {
            where: {
                id: parseInt( parseInt(req.params.id) )
            }
        })
        .then(
            (values) =>
                res.json(resp({
                    data: values
                })),
            (err) =>
                res.json(resp({
                    rslt: false,
                    msg: 'Не удалось изменить! Ошибка: ' + err.message
                }))
        );
});

router.route('/:id')
  .delete(function(req, res, next) {
      
    models.street.destroy({
            where: {
                id: parseInt( parseInt(req.params.id) )
            }
        })
        .then(
            () =>
                res.json(resp()), 
            (err) =>
                res.json(resp({
                    rslt: false,
                    msg: 'Не удалось удалить! Ошибка: ' + err.message
                }))
        );
});

module.exports = router;