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
            
            const sql = 
               `SELECT a.*,
                    b.name as territory
                FROM territory a
                    left join territory b on a.territory_id = b.id
                WHERE
                    a.id in (:oArray)`;
            
            models.sequelize.query(sql, { replacements: { oArray: outputArray }, type: models.sequelize.QueryTypes.SELECT })
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
    
    models.territory.findById( parseInt( req.params.id ) )
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
      
    models.territory.create(req.body)
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
      
    models.territory.update(
        req.body,
        {
            where: {
                id: parseInt( req.params.id )
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
      
    models.territory.destroy({
            where: {
                id: parseInt( req.params.id )
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
