var express = require('express');
var router = express.Router();
var models = require('../models');
var resp = require('../lib/resp');

router.route('/')
  .get(function(req, res, next) {

    sql = "SELECT a.*, b.name as territory "+
        "FROM street a left join territory b on a.territory_id = b.id ";
    
    console.log(req.query.name);
    if (req.query.name) {
        sql = sql + "WHERE lower(concat(a.name,' ',a.socr)) like lower('%" + req.query.name + "%')";
    }
    
    models.sequelize.query(sql, models.value )

        .spread(function(values, metadata) {
            res.json(resp({
                data: values
            }));
        });
});

router.route('/:id')
  .get(function(req, res, next) {
    
    models.street.findById( parseInt(req.params.id) )
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

router.route('/')
  .post(function(req, res) {
    console.log(req.body);
    models.street.create(req.body).then(
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

router.route('/:id')
  .put(function(req, res, next) {
      
    models.street.update(
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
      
    models.street.destroy({
            where: {
                id: parseInt( parseInt(req.params.id) )
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