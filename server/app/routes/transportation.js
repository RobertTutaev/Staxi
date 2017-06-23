var express = require('express');
var router = express.Router();
var models = require('../models');
var resp = require('../lib/resp');

router.route('/c:id')
  .get(function(req, res, next) {
    
    models.sequelize.query(
        "SELECT a.*, "+
            "concat(b.name,' (',b.gos_no,')') as car, "+
            "d.name as punkt, "+
            "trim(concat(c.first_name,' ',c.last_name)) as user, "+
            "concat(e.name,', ',e.socr,', ',a.a_dom,a.a_korp) as a_adr, "+
            "concat(f.name,', ',f.socr,', ',a.b_dom,a.b_korp) as b_adr "+
        "FROM transportation a "+
            "join car b on a.car_id = b.id "+
            "join user c on a.user_id = c.id "+
            "join punkt d on a.punkt_id = d.id "+
            "join street e on a.a_street_id = e.id "+
            "join street f on a.b_street_id = f.id "+
        "WHERE a.client_id = " + parseInt(req.params.id), models.value )

        .spread(function(values, metadata) {
            res.json(resp({
                data: values
            }));
        });
});

router.route('/:id')
  .get(function(req, res, next) {
    
    models.sequelize.query(
        "SELECT a.*, "+
            "concat(e.name,' ',e.socr) as a_street, "+
            "concat(f.name,' ',f.socr) as b_street "+
        "FROM transportation a "+
            "join street e on a.a_street_id = e.id "+
            "join street f on a.b_street_id = f.id "+
        "WHERE a.id = " + parseInt(req.params.id), models.value )

        .spread(function(values, metadata) {
            res.json(resp({
                data: values[0]
            }));
        });
});

router.route('/')
  .post(function(req, res) {
    req.body.user_id=1;
    models.transportation.create(req.body).then(
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
      
    models.transportation.update(
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
      
    models.transportation.destroy({
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