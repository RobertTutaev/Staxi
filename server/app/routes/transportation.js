var express = require('express');
var router = express.Router();
var models = require('../models');
var resp = require('../lib/resp');

router.route('/c:id')
  .get(function(req, res, next) {
    
    var idValue = parseInt(req.params.id);
    var sql = 
        "SELECT a.*, "+
            "concat(b.name,' (',b.gos_no,')') as car, " +
            "d.name as punkt, " +
            "trim(concat(c.first_name,' ',c.last_name)) as user, " +
            "trim(concat(g.first_name,' ',g.last_name)) as userm, " +
            "concat(e.name,', ',e.socr,', ',a.a_dom,a.a_korp) as a_adr, " +
            "concat(f.name,', ',f.socr,', ',a.b_dom,a.b_korp) as b_adr " +            
        "FROM transportation a " +
            "join car b on a.car_id = b.id " +
            "join user c on a.user_id = c.id " +
            "join punkt d on a.punkt_id = d.id " +
            "join street e on a.a_street_id = e.id " +
            "join street f on a.b_street_id = f.id " +
            "left join user g on a.userm_id = g.id " +
        "WHERE a.client_id = :id";    

    models.sequelize.query(sql, { replacements: { id: idValue }, type: models.sequelize.QueryTypes.SELECT })
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
    
    var user = req.user;
    if(user !== undefined) {
        user = user.toJSON();
    }    
    req.body.user_id=user.id;
    req.body.dt=new Date();
    
    models.transportation.create(req.body).then(
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
                rslt: false,
                msg: 'Не удалось удалить! Ошибка: ' + err.message
            }));
        }
    );
});

router.route('/report/a')
  .get(function(req, res, next) {

    var firmId = req.query.firmId ? parseInt(req.query.firmId) : 0;
    var aDt = req.query.a_dt ? req.query.a_dt : new Date(2000, 1, 1);
    var bDt = req.query.b_dt ? req.query.b_dt : new Date(2100, 1, 1);
    var status = req.query.status ? parseInt(req.query.status) : 0;
    var withChilds = req.query.withChilds ? Boolean(req.query.withChilds) : false;
    var sql = 
        "SELECT a.*, "+        
            "h.name as firm, " +
            "concat(b.name,' (',b.gos_no,')') as car, " +
            "trim(concat(c.first_name,' ',c.last_name)) as user, " +
            "trim(concat(g.first_name,' ',g.last_name)) as userm, " +
            "concat(e.name,', ',e.socr,', ',a.a_dom,a.a_korp) as a_adr, " +
            "concat(f.name,', ',f.socr,', ',a.b_dom,a.b_korp) as b_adr " +            
        "FROM transportation a " +
            "join car b on a.car_id = b.id " +
            "join user c on a.user_id = c.id " +
            "join punkt d on a.punkt_id = d.id " +
            "join street e on a.a_street_id = e.id " +
            "join street f on a.b_street_id = f.id " +
            "left join user g on a.userm_id = g.id " +
            "join firm h on c.firm_id = h.id " +
        "WHERE " + 
            "h.id = :firmId AND " +
            "a.a_dt >= :aDt AND " +
            "a.b_dt <= :bDt AND " +
            "a.status = :status " +
        "ORDER BY " +
            "firm, " +
            "car, " +
            "a.a_dt, " +
            "a.b_dt";

    models.sequelize.query(
            sql, 
            { 
                replacements: { 
                    'firmId': firmId,
                    'aDt': aDt,
                    'bDt': bDt,
                    'status': status 
                }, 
                type: models.sequelize.QueryTypes.SELECT 
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

module.exports = router;