var express = require('express');
var router = express.Router();
var models = require('../models');
var resp = require('../lib/resp');
var dbtools = require('../lib/dbtools');

router.route('/')
  .get(function(req, res, next) {
    
    var user = req.user;
    if (user !== undefined) user = user.toJSON();

    dbtools.getOutputArray(
        'firm', 
        user.firm_id, 
        function(outputArray) {
            
            var sql = 
                `SELECT a.*,
                    b.name as firm,
                    c.name as territory
                FROM firm a
                    left join firm b on a.firm_id = b.id
                    left join territory c on a.territory_id = c.id
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
    
    models.firm.findById(parseInt(req.params.id))
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
  .post(function(req, res, next) {
      
    models.firm.create(req.body)
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
      
    models.firm.update(
        req.body,
        {
            where: {
                id: parseInt( parseInt(req.params.id) )
            }
        }).then(
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
      
    models.firm.destroy({
            where: {
                id: parseInt( parseInt(req.params.id) )
            }
        }).then(
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