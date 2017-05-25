var express = require('express');
var router = express.Router();
var models = require('../models');
var resp = require('../lib/resp');

router.route('/read')
  .get(function(req, res, next) {
    
    models.clients.findAll({
            order: ["inn"]
        })
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
});

router.route('/create')
  .post(function(req, res, next) {
      
    models.clients.create(req.body).then(
        function(values) {
            res.json(resp({                
                data: values
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

router.route('/update')
  .post(function(req, res, next) {
      
    models.clients.update(
        req.body,
        {
            where: {
                client_id: parseInt(req.body.client_id)
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

router.route('/delete')
  .post(function(req, res, next) {
      
    models.clients.destroy({
            where: {
                client_id: parseInt(req.body.client_id)
            }
        }).then(
        function() {
            res.json(resp());
        }, 
        function(err) {
            res.json(resp({
                msg: 'Не удалось удалить! Ошибка: ' + err.message
            }));
        }
    );
});

module.exports = router;