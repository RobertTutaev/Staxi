var express = require('express');
var router = express.Router();
var models = require('../models');
var resp = require('../lib/resp');
var dbtools = require('../lib/dbtools');

router.route('/c:checkStatus')
  .get(function(req, res, next) {

    const checkStatus = req.params.checkStatus ? parseInt(req.params.checkStatus) : 0;
    var user = req.user;
    if (user !== undefined) user = user.toJSON();

    dbtools.getOutputArray(
        'firm',
        user.firm_id,
        function(outputArray) {
            
            const sql = 
               `SELECT
                    a.*,
                    b.name as firm,
                    concat(c.first_name,' ',c.last_name) as user
                FROM car a
                    join firm b on a.firm_id = b.id
                    join user c on a.user_id = c.id
                WHERE
                    a.firm_id in (:oArray) and
                    a.status >= :status`;
            
            models.sequelize.query(
                    sql,
                    {
                        replacements: {
                            oArray: outputArray,
                            status: checkStatus
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

router.route('/d:checkStatus')
.get(function(req, res, next) {

    const checkStatus = req.params.checkStatus ? parseInt(req.params.checkStatus) : 0;
    var user = req.user;
    if (user !== undefined) user = user.toJSON();
    
    const sql =
        `SELECT
            a.*,
            b.name as firm,
            concat(c.first_name,' ',c.last_name) as user
        FROM car a
            join firm b on a.firm_id = b.id
            join user c on a.user_id = c.id
        WHERE
            a.user_id = :userId AND
            a.status >= :status`;

    models.sequelize.query(
            sql,
            {
                replacements: {
                    userId: user.id,
                    status: checkStatus
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
});

router.route('/:id')
  .get(function(req, res, next) {

    const sql = 
        `SELECT 
            a.*, 
            b.name as firm,
            concat(c.first_name,' ',c.last_name) as user
        FROM car a 
            join firm b on a.firm_id = b.id
            join user c on a.user_id = c.id
        WHERE
            a.id = :id`;
    
    models.sequelize.query(sql, { replacements: { id: parseInt(req.params.id) }, type: models.sequelize.QueryTypes.SELECT })
        .then(
            (values) =>                   
                res.json(resp({
                    data: values[0]
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
    
    models.car.create(req.body)
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
      
    models.car.update(
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
      
    models.car.destroy({
            where: {
                id: parseInt( req.params.id )
            }
        })
        .then(
            () => res.json(resp()),
            (err) =>
                res.json(resp({
                    rslt: false,
                    msg: 'Не удалось удалить! Ошибка: ' + err.message
                }))
        );
});

module.exports = router;