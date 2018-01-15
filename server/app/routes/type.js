var express = require('express');
var router = express.Router();
var models = require('../models');
var resp = require('../lib/resp');

router.route('/')
  .get(function(req, res, next) {
    
    models.type.findAll({
            order: ["id"]
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
    
    models.type.findById(parseInt(req.params.id))
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
      
    models.type.create(req.body)
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
      
    models.type.update(
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
      
    models.type.destroy({
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