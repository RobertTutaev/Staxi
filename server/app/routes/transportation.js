var express = require('express');
var router = express.Router();
var models = require('../models');
var resp = require('../lib/resp');
var dbtools = require('../lib/dbtools');
var dbreports = require('../lib/dbreports');

router.route('/c:id/:getFile')
  .get(function(req, res, next) {
    
    var clientId = parseInt(req.params.id);
    var getFile = req.params.getFile ? parseInt(req.params.getFile) : 0;
    var sql = 
        `SELECT a.*, 
            concat(b.name,' (',b.gos_no,')') as car,
            d.name as punkt,
            trim(concat(c.first_name,' ',c.last_name)) as user,
            trim(concat(g.first_name,' ',g.last_name)) as userm,
            concat(e.name,', ',e.socr,', ',a.a_dom,a.a_korp) as a_adr,
            concat(f.name,', ',f.socr,', ',a.b_dom,a.b_korp) as b_adr,
            h.name as status
        FROM transportation a
            join car b on a.car_id = b.id
            join user c on a.user_id = c.id
            join punkt d on a.punkt_id = d.id
            join street e on a.a_street_id = e.id
            join street f on a.b_street_id = f.id
            join status h on a.status_id = h.id
            left join user g on a.userm_id = g.id
        WHERE a.client_id = :id`;    

    models.sequelize.query(sql, { replacements: { id: clientId }, type: models.sequelize.QueryTypes.SELECT })
        .then(
        function(values) {
            // Если необходим файл
            if (getFile) {
                var user = req.user;
                if(user !== undefined) user = user.toJSON();
                
                dbreports.getT(values, user, clientId, res);
            // Если необходим результат
            } else {
                res.json(resp({
                    data: values
                }));
            }
        }, 
        function(err) {
            res.json(resp({
                rslt: false,
                msg: 'Не удалось получить список! Ошибка: ' + err.message
            }));
        }
    );
});

router.route('/stat:id')
  .get(function(req, res, next) {
    
    var crDt = new Date();
    var year = crDt.getFullYear();
    var aDt = new Date(year, 0, 1);
    var bDt = new Date(year, 12, 0);    
    var sql =
        `SELECT	
            s.id,
            s.name,
            count(t.id) as cnt
        FROM status s
            LEFT JOIN transportation t on s.id = t.status_id AND t.client_id = :id AND DATE(t.a_dt) BETWEEN DATE(:aDt) AND DATE(:bDt)
        GROUP BY
            s.id,
            s.name`;

    models.sequelize.query(
            sql, 
            { 
                replacements: { 
                    id: parseInt(req.params.id),
                    aDt: aDt,
                    bDt: bDt
                }, 
                type: models.sequelize.QueryTypes.SELECT 
            }
        )
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
    
    var sql =
        `SELECT a.*,
            concat(b.name,' (',b.gos_no,')') as car,
            concat(e.name,' ',e.socr) as a_street, 
            concat(f.name,' ',f.socr) as b_street 
        FROM transportation a
            join car b on a.car_id = b.id
            join street e on a.a_street_id = e.id 
            join street f on a.b_street_id = f.id 
        WHERE a.id = :id`;

    models.sequelize.query(sql, { replacements: { id: parseInt(req.params.id) }, type: models.sequelize.QueryTypes.SELECT })
        .then(
        function(values) {
            res.json(resp({
                data: values[0]
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

module.exports = router;