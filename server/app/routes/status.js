var express = require('express');
var router = express.Router();
var models = require('../models');
var resp = require('../lib/resp');

router.route('/')
  .get(function(req, res, next) {
    
    models.status.findAll({
            order: ['id']
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

module.exports = router;