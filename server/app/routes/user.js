var express = require('express');
var router = express.Router();
var models = require('../models');
var resp = require('../lib/resp');
var bcrypt  = require('bcrypt-nodejs');

router.route('/')
  .get(function(req, res, next) {
    
    var sql = 
        "SELECT a.*, b.name as firm " +
        "FROM user a left join firm b on a.firm_id = b.id";    

    models.sequelize.query(sql, { type: models.sequelize.QueryTypes.SELECT })
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

router.route('/:id')
  .get(function(req, res, next) {
    
    models.user.findById(parseInt(req.params.id))
        .then(
        function(value) {
            value.password = '';
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
  .post(function(req, res, next) {
    
    req.body.password = bcrypt.hashSync(req.body.password);
    req.body.dt=new Date();
      
    models.user.create(req.body).then(
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

    req.body.password = bcrypt.hashSync(req.body.password);
    req.body.dtm=new Date();
      
    models.user.update(
        req.body,
        {
            where: {
                id: parseInt( parseInt(req.body.id) )
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
      
    models.user.destroy({
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