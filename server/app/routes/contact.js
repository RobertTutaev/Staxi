var express = require('express');
var router = express.Router();
var models = require('../models');
var resp = require('../lib/resp');

router.route('/c:id')
  .get(function(req, res, next) {

    var idValue = parseInt(req.params.id);
    var sql = 
        `SELECT a.*,
            b.style as type,
            concat(c.first_name,' ',c.last_name) as user,
            concat(d.first_name,' ',d.last_name) as userm
        FROM contact a
            join type b on a.type_id = b.id 
            join user c on a.user_id = c.id
            left join user d on a.userm_id = d.id
        WHERE a.client_id = :id`;    

    models.sequelize.query(sql, { replacements: { id: idValue }, type: models.sequelize.QueryTypes.SELECT })
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
    
    models.contact.findById(parseInt(req.params.id))
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
    
    var user = req.user;
    if (user !== undefined) user = user.toJSON();
    req.body.user_id=user.id;
    req.body.dt=new Date();

    models.contact.create(req.body)
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
    
    var user = req.user;
    if (user !== undefined) user = user.toJSON();    
    req.body.userm_id=user.id;
    req.body.dtm=new Date();

    models.contact.update(
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
      
    models.contact.destroy({
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