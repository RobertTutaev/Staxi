var express = require('express');
var router = express.Router();
var models = require('../models');
var resp = require('../lib/resp');
var dbtools = require('../lib/dbtools');
var dbreports = require('../lib/dbreports');

router.route('/c:id/:getFile/:column/:direction')
  .get(function(req, res, next) {
    
    const clientId = parseInt(req.params.id);
    const getFile = req.params.getFile ? parseInt(req.params.getFile) : 0;
    const column = req.params.column ? req.params.column.replace(/[^a-zA-Z\-_]/gi,'') : 'id';    
    const direction = req.params.direction ? (parseInt(req.params.direction)>0 ? 'asc' : 'desc'): 'desc';
    const sql = 
        `SELECT a.*,
            j.reason_id,
            concat(b.name,' (',b.gos_no,')') as car,
            d.name as punkt,
            concat(c.first_name,' ',c.last_name) as user,
            concat(g.first_name,' ',g.last_name) as userm,
            concat(n.name,', ',e.socr,' ',e.name,', ',a.a_dom,a.a_korp,if(a.a_pod is null,'',concat(', под.',a.a_pod))) as a_adr,
            concat(o.name,', ',f.socr,' ',f.name,', ',a.b_dom,a.b_korp,if(a.b_pod is null,'',concat(', под.',a.b_pod))) as b_adr,
            h.name as status
        FROM transportation a
            join car b on a.car_id = b.id
            join user c on a.user_id = c.id
            join punkt d on a.punkt_id = d.id
            join street e on a.a_street_id = e.id
            join street f on a.b_street_id = f.id
            join status h on a.status_id = h.id
            join client j on a.client_id = j.id
            left join user g on a.userm_id = g.id
            join territory n on e.territory_id=n.id
            join territory o on f.territory_id=o.id
        WHERE a.client_id = :id 
            ORDER BY ${column} ${direction}`;    

    models.sequelize.query(sql, {replacements: {id: clientId}, type: models.sequelize.QueryTypes.SELECT})
        .then(
            (values) => {
                // Если необходим файл
                if (getFile) {
                    var user = req.user;
                    if (user !== undefined) user = user.toJSON();
                    
                    dbreports.getT(values, user, clientId, res);
                // Если необходим результат
                } else {                    
                    res.json(resp({
                        data: values
                    }));
                }
            }, 
            (err) =>
                res.json(resp({
                    rslt: false,
                    msg: 'Не удалось получить список! Ошибка: ' + err.message
                }))
        );
});

router.route('/stat:id')
  .get(function(req, res, next) {
    
    const crDt = new Date();
    const year = crDt.getFullYear();
    const aDt = new Date(year, 0, 1);
    const bDt = new Date(year, 12, 0);    
    const sql =
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
    
    const sql =
        `SELECT a.*,
            concat(b.name,' (',b.gos_no,')') as car,
            c.name as punkt,
            concat(n.name,', ',e.socr,' ',e.name) as a_street, 
            concat(o.name,', ',f.socr,' ',f.name) as b_street 
        FROM transportation a
            join car b on a.car_id = b.id
            join punkt c on a.punkt_id = c.id
            join street e on a.a_street_id = e.id
            join street f on a.b_street_id = f.id
            join territory n on e.territory_id=n.id
            join territory o on f.territory_id=o.id
        WHERE a.id = :id`;

    models.sequelize.query(sql, { replacements: { id: parseInt(req.params.id) }, type: models.sequelize.QueryTypes.SELECT })
        .then(
            (values) =>
                res.json(resp({
                    data: values[0]
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
    req.body.dt = new Date();

    dbtools.canTransportationAdd(req.body)
        .then(() =>
                models.transportation.create(req.body)
        )
        .then((value) =>
                res.json(resp({
                    data: value
                }))
        )
        .catch((err) => 
                res.json(resp({
                    rslt: false,
                    msg: err.message
                }))
        );
});

router.route('/:id')
  .put(function(req, res, next) {

    const id = parseInt(req.params.id);
    var user = req.user;
    if (user !== undefined) user = user.toJSON();
    req.body.userm_id = user.id;
    req.body.dtm = new Date();

    // Проверка Статуса для разрешения/запрещения действий с заявкой
    dbtools.canTransportationChange(id, user)
        .then(() =>
                dbtools.canTransportationAdd(req.body)
        )
        .then(() =>
                models.transportation.update(
                        req.body,
                        {
                            where: {
                                id: id
                            }
                        })
        )
        .then(() =>
                res.json(resp({
                    data: values
                }))
        )
        .catch((err) =>
                res.json(resp({
                    rslt: false,
                    msg: err.message
                }))
        );
});

router.route('/:id')
  .delete(function(req, res, next) {

    const id = parseInt(req.params.id);
    var user = req.user;
    if (user !== undefined) user = user.toJSON();
    
    // Проверка Статуса для разрешения/запрещения действий с заявкой
    dbtools.canTransportationChange(id, user)
        .then(() =>
                models.transportation.destroy({
                        where: {
                            id: id
                        }
                    })
        )
        .then(() =>
                res.json(resp())
        )
        .catch((err) =>
                res.json(resp({
                    rslt: false,
                    msg: err.message
                }))    
        );
});

module.exports = router;