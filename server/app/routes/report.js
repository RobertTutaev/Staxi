var express = require('express');
var async = require('async');
var router = express.Router();
var models = require('../models');
var resp = require('../lib/resp');
var dbtools = require('../lib/dbtools');

router.route('/a/:firmId/:aDt/:bDt/:statusId/:withChilds')
  .get(function(req, res, next) {

    var firmId = req.params.firmId ? parseInt(req.params.firmId) : 0;
    var aDt = req.params.aDt ? new Date(parseInt(req.params.aDt)) : new Date(2000, 1, 1);
    var bDt = req.params.bDt ? new Date(parseInt(req.params.bDt)) : new Date(2100, 1, 1);
    var statusId = req.params.statusId ? parseInt(req.params.statusId) : 0;
    var withChilds = req.params.withChilds ? (parseInt(req.params.withChilds) ? true : false) : false;
    
    dbtools.getOutputArray(
        'firm', 
        firmId, 
        function(outputArray) {
            
            var sql =
                `SELECT
                    a.id,
                    a.client_id,
                    a.a_dt,
                    a.b_dt,
                    a.dt,
                    a.dtm,
                    h.name as firm,
                    concat('Наз.: ',b.name,'; г.н.: ',b.gos_no,'; вод.: ',ifnull(b.driver_name,''),'; тел.: ',ifnull(b.driver_phone,'')) as car,
                    trim(concat(c.first_name,' ',c.last_name)) as user,
                    trim(concat(g.first_name,' ',g.last_name)) as userm,
                    concat(e.name,', ',e.socr,', ',a.a_dom,a.a_korp) as a_adr,
                    concat(f.name,', ',f.socr,', ',a.b_dom,a.b_korp) as b_adr,
                    concat('СНИЛС: ',i.snils,'; И.О.: ',i.im,' ',ifnull(i.ot,''),'; тел.: ',ifnull(j.name,''),'; док.: ',m.name,'; кат.: ',l.name) as client
                FROM transportation a
                    join car b on a.car_id = b.id
                    join user c on a.user_id = c.id
                    join punkt d on a.punkt_id = d.id
                    join street e on a.a_street_id = e.id
                    join street f on a.b_street_id = f.id
                    left join user g on a.userm_id = g.id
                    join firm h on c.firm_id = h.id
                    join client i on i.id = a.client_id
                    left join contact j on j.client_id = i.id and j.type_id = 1
                    join category k on a.category_id = k.id
                    join kateg l on k.kateg_id = l.id
                    join doc m on k.doc_id = m.id
                WHERE
                    h.id in (:oArray) AND
                    DATE(a.a_dt) BETWEEN DATE(:aDt) AND DATE(:bDt) AND
                    a.status_id = :status
                ORDER BY
                    firm,
                    car,
                    a.a_dt,
                    a.b_dt`;
                
            models.sequelize.query(
                    sql, 
                    { 
                        replacements: { 
                            oArray: withChilds ? outputArray : [firmId],
                            aDt: aDt,
                            bDt: bDt,
                            status: statusId 
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

        }
    );
});

router.route('/b/:firmId/:aYear/:bMonth/:withChilds')
  .get(function(req, res, next) {

    var firmId = req.params.firmId ? parseInt(req.params.firmId) : 0;
    var aYear = req.params.aYear ? parseInt(req.params.aYear) : (new Date()).getFullYear();
    var aMonth = req.params.aMonth ? parseInt(req.params.aMonth) : (new Date()).getMonth() + 1;
    var withChilds = req.params.withChilds ? (parseInt(req.params.withChilds) ? true : false) : false;
    
    dbtools.getOutputArray(
        'firm', 
        firmId, 
        function(outputArray) {
            
            var sql =
`SELECT	
	100 as n,
	'sdsds' as name,
	count(if(c.type=0, t.id, null)) as i0,
	count(if(c.type>0, t.id, null)) as i1
FROM status s
	left join transportation t on s.id = t.status_id
	left join car c on c.id = t.car_id
WHERE 
	s.id>1
UNION	
SELECT
	100+@i:=@i+1,
	s.name,
	count(if(c.type=0, t.id, null)),
	count(if(c.type>0, t.id, null))	
FROM status s
	left join transportation t on s.id = t.status_id
	left join car c on c.id = t.car_id,
	(select @i:=0) i
WHERE 
	s.id>1
GROUP BY
	s.name
UNION
SELECT
	200,
	'sdsfgfds',
	null,
	null
UNION
SELECT
	200+@j:=@j+1,
	p.name,
	count(if(c.type=0, t.id, null)),
	count(if(c.type>0, t.id, null))
FROM punkt p
	left join transportation t on p.id = t.punkt_id
	left join car c on c.id = t.car_id,
	(select @j:=0) j
WHERE 
	t.status_id=2 or t.status_id is null
group by
	p.name
UNION
SELECT
	300,
	'sdkjkjsfgfds',
	null,
	null
UNION
SELECT
	300+@k:=@k+1,
	a.name,
	count(if(c.type=0, t.id, null)),
	count(if(c.type>0, t.id, null))
FROM kateg a
	left join category b on b.kateg_id=a.id
	left join transportation t on b.id = t.category_id
	left join car c on c.id = t.car_id,
	(select @k:=0) k
WHERE 
	t.status_id=2 or t.status_id is null
group by
	a.name
ORDER BY
	n`;
var sql = 
        `SELECT * FROM car`;            
            async.parallel([
                // i0
                function(callback){
                    models.sequelize.query(
                        sql, 
                        { 
                            replacements: {
                        }, 
                        type: models.sequelize.QueryTypes.SELECT 
                    })
                    .then(
                        function(values){
                            callback(null, values)
                        },
                        function(err){
                            callback(err, null)
                        }
                    );
                },
                // i1
                function(callback){
                    models.sequelize.query(
                        sql, 
                        { 
                            replacements: {
                        }, 
                        type: models.sequelize.QueryTypes.SELECT 
                    })
                    .then(
                        function(values){
                            callback(null, values)
                        },
                        function(err){
                            callback(err, null)
                        }
                    );
                },
                // i2
                function(callback){
                    models.sequelize.query(
                        sql, 
                        { 
                            replacements: {
                        }, 
                        type: models.sequelize.QueryTypes.SELECT 
                    })
                    .then(
                        function(values){
                            callback(null, values)
                        },
                        function(err){
                            callback(err, null)
                        }
                    );
                },
                // i3
                function(callback){
                    models.sequelize.query(
                        sql, 
                        { 
                            replacements: {
                        }, 
                        type: models.sequelize.QueryTypes.SELECT 
                    })
                    .then(
                        function(values){
                            callback(null, values)
                        },
                        function(err){
                            callback(err, null)
                        }
                    );
                }
                ],
                function(err, results){
                    console.log(results);
                }
            );
        }
    );
});

module.exports = router;