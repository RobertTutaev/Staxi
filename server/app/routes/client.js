var express = require('express');
var router = express.Router();
var models = require('../models');
var resp = require('../lib/resp');

router.route('/')
  .get(function(req, res, next) {
    
        var sql = 
            "SELECT a.*, " +
                "b.name as street, " +
                "trim(concat(c.first_name,' ',c.last_name)) as user, " +
                "trim(concat(d.first_name,' ',d.last_name)) as userm " +
            "FROM client a " + 
                "left join street b on a.street_id = b.id " +
                "join user c on a.user_id = c.id " +
                "left join user d on a.userm_id = d.id ";        
    
        if (req.query.snils) {
            sql = sql + "WHERE a.snils like '%" + req.query.snils + "%'";
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
    
    models.client.findById(parseInt(req.params.id))
        .then(
        function(value) {
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
  .post(function(req, res) {

    var user = req.user;
    if(user !== undefined) {
        user = user.toJSON();
    }    
    req.body.user_id=user.id;
    req.body.dt=new Date();

    models.client.create(req.body).then(
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
     
    var user = req.user;
    if(user !== undefined) {
        user = user.toJSON();
    }    
    req.body.userm_id=user.id;
    req.body.dtm=new Date();
    
    models.client.update(
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
      
    models.client.destroy({
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