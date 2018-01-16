var express = require('express');
var router = express.Router();
var models = require('../models');
var resp = require('../lib/resp');
var dbtools = require('../lib/dbtools');
var dbreports = require('../lib/dbreports');

router.route('/a/:firmId/:aDt/:bDt/:statusId/:withChilds/:getFile')
  .get(function(req, res, next) {

    var firmId = req.params.firmId ? parseInt(req.params.firmId) : 0;
    var aDt = req.params.aDt ? new Date(parseInt(req.params.aDt)) : new Date(2000, 0, 1);
    var bDt = req.params.bDt ? new Date(parseInt(req.params.bDt)) : new Date(2100, 0, 1);
    var statusId = req.params.statusId ? parseInt(req.params.statusId) : 0;
    var withChilds = req.params.withChilds ? parseInt(req.params.withChilds) : false;
    var getFile = req.params.getFile ? parseInt(req.params.getFile) : 0;

    if (!firmId)
        return  res.json(resp({
                    data: []
                }));
    
    dbtools.getOutputArray(
        'firm', 
        firmId, 
        function(outputArray) {
            
            var sql =
                `SELECT
                    a.id,
                    a.client_id,
                    i.reason_id,
                    a.convoy,
                    a.a_dt,
                    a.b_dt,
                    a.dt,
                    a.dtm,
                    h.name as firm,
                    concat(b.name,'; г.н.: ',b.gos_no,'; цвет: ',ifnull(b.color,'')) as car,
                    concat(c.first_name,' ',c.last_name) as user,
                    concat(g.first_name,' ',g.last_name) as userm,
                    concat(n.name,', ',e.socr,' ',e.name,', ',a.a_dom,a.a_korp,if(a.a_pod is null,'',concat(', под.',a.a_pod))) as a_adr,
                    concat(o.name,', ',f.socr,' ',f.name,', ',a.b_dom,a.b_korp,if(a.b_pod is null,'',concat(', под.',a.b_pod))) as b_adr,
                    concat('СНИЛС: ',i.snils,'; Ф.И.О.: ',i.fam,' ',i.im,' ',ifnull(i.ot,''),if(a.convoy>0,' (сопровожд.)',''),'; тел.: ',ifnull(j.name,''),'; док.: ',m.name,'; кат.: ',l.name) as client
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
                    join territory n on e.territory_id=n.id
                    join territory o on f.territory_id=o.id
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
                    
                    // Если необходим файл
                    if (getFile) {
                        var user = req.user;
                        if (user !== undefined) user = user.toJSON();
                        
                        dbreports.getA(values, user, firmId, aDt, bDt, statusId, withChilds, res);                        
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

        }
    );
});

router.route('/b/:firmId/:aYear/:aMonth/:withChilds/:getFile')
  .get(function(req, res, next) {

    var firmId = req.params.firmId ? parseInt(req.params.firmId) : 0;
    var aYear = req.params.aYear ? parseInt(req.params.aYear) : (new Date()).getFullYear();
    var aMonth = req.params.aMonth ? parseInt(req.params.aMonth) : (new Date()).getMonth() + 1;
    var withChilds = req.params.withChilds ? parseInt(req.params.withChilds) : 0;
    var getFile = req.params.getFile ? parseInt(req.params.getFile) : 0;

    var aDtMonth= new Date(aYear, aMonth - 1, 1);
    var aDtYear = new Date(aYear, 0, 1);
    var bDt     = new Date(aYear, aMonth, 0);
    console.log(aYear, aMonth);

    if (!firmId)
        return  res.json(resp({
                    data: []
                }));
    
    dbtools.getOutputArray(
        'firm', 
        firmId, 
        function(outputArray) {
            
            var sql =
                `SELECT
                    100 as n,
                    'Поступило заявок в т.ч.:' as name,
                    count(if(c.type=0, u.firm_id, null)) as i0,
                    count(if(c.type>0, u.firm_id, null)) as i1
                FROM status s
                    left join transportation t on s.id = t.status_id and DATE(t.a_dt) BETWEEN DATE(:aDt) AND DATE(:bDt)
                    left join user u on t.user_id = u.id and u.firm_id in (:oArray)
                    left join car c on c.id = t.car_id                    
                WHERE
                    s.id>2
                UNION
                SELECT
                    100+@i:=@i+1,
                    s.name,
                    count(if(c.type=0, u.firm_id, null)),
                    count(if(c.type>0, u.firm_id, null))
                FROM status s
                    left join transportation t on s.id = t.status_id and DATE(t.a_dt) BETWEEN DATE(:aDt) AND DATE(:bDt)
                    left join user u on t.user_id = u.id and u.firm_id in (:oArray)
                    left join car c on c.id = t.car_id,
                    (select @i:=0) i
                WHERE
                    s.id>2
                GROUP BY
                    s.name
                UNION
                SELECT
                    200,
                    'Социально значимые объекты инфраструктуры города Челябинска',
                    null,
                    null
                UNION
                SELECT
                    200+@j:=@j+1,
                    p.name,
                    count(if(c.type=0, u.firm_id, null)),
                    count(if(c.type>0, u.firm_id, null))
                FROM punkt p
                    left join transportation t on p.id = t.punkt_id and t.status_id=3 and DATE(t.a_dt) BETWEEN DATE(:aDt) AND DATE(:bDt)
                    left join user u on t.user_id = u.id and u.firm_id in (:oArray)
                    left join car c on c.id = t.car_id,
                    (select @j:=0) j	
                group by
                    p.name
                UNION
                SELECT
                    300,
                    'Категории граждан, имеющие право на обслуживание социальной службой',
                    null,
                    null
                UNION
                SELECT
                    300+@k:=@k+1,
                    a.name,
                    count(if(c.type=0, u.firm_id, null)),
                    count(if(c.type>0, u.firm_id, null))
                FROM kateg a
                    left join category b on b.kateg_id=a.id
                    left join transportation t on b.id = t.category_id and t.status_id=3 and DATE(t.a_dt) BETWEEN DATE(:aDt) AND DATE(:bDt)
                    left join user u on t.user_id = u.id and u.firm_id in (:oArray)
                    left join car c on c.id = t.car_id,
                    (select @k:=0) k
                group by
                    a.name
                ORDER BY
                    n`;  
        
            Promise.all([
                    // i0, i1
                    models.sequelize.query(
                        sql, 
                        { 
                            replacements: { 
                                oArray: withChilds ? outputArray : [firmId],
                                aDt: aDtMonth,
                                bDt: bDt 
                            },  
                            type: models.sequelize.QueryTypes.SELECT 
                        }),
                    // i2, i3
                    models.sequelize.query(
                        sql, 
                        { 
                            replacements: { 
                                oArray: withChilds ? outputArray : [firmId],
                                aDt: aDtYear,
                                bDt: bDt 
                            },  
                            type: models.sequelize.QueryTypes.SELECT 
                        })
                    ])
                .then(
                    (values) => {
                        values[0].forEach(function(element, index, array) {
                            element.i2 = values[1][index].i0;
                            element.i3 = values[1][index].i1;
                        });
                    
                        // Если необходим файл
                        if (getFile) {
                            var user = req.user;
                            if (user !== undefined) user = user.toJSON();

                            dbreports.getB(values[0], user, firmId, aYear, aMonth, withChilds, res);

                        // Если необходим результат
                        } else {
                            res.json(resp({
                                data: values[0]
                            }));
                        }
                    },
                    (err) => 
                        res.json(resp({
                            rslt: false,
                            msg: 'Не удалось получить список! Ошибка: ' + err.message
                        }))
                )            
        }
    );
});

router.route('/c/:carId/:aDt/:getFile')
  .get(function(req, res, next) {

    var carId = req.params.carId ? parseInt(req.params.carId) : 0;
    var aDt = req.params.aDt ? new Date(parseInt(req.params.aDt)) : new Date();
    var getFile = req.params.getFile ? parseInt(req.params.getFile) : 0;

    if (!carId)
        return  res.json(resp({
                    data: []
                }));
               
    var sql =
        `SELECT
            a.id,                    
            concat(DATE_FORMAT(CONVERT_TZ(a_dt,'+00:00',@@global.time_zone), '%H:%i'),IF(ISNULL(a.b_dt),'',DATE_FORMAT(CONVERT_TZ(b_dt,'+00:00',@@global.time_zone), '-%H:%i'))) as dt,
            i.reason_id,
            a.status_id,
            a.convoy,
            a.comment,
            concat(n.name,', ',e.socr,' ',e.name,', ',a.a_dom,a.a_korp,if(a.a_pod is null,'',concat(', под.',a.a_pod))) as a_adr,
            concat(o.name,', ',f.socr,' ',f.name,', ',a.b_dom,a.b_korp,if(a.b_pod is null,'',concat(', под.',a.b_pod))) as b_adr,
            a.client_id,
            concat(i.fam,' ',i.im,' ',ifnull(i.ot,''),if(a.convoy>0,' (сопровождение)','')) as client_name,
            ifnull(j.name,'') as client_contact,
            concat('СНИЛС: ',i.snils,'; док.: ',m.name,'; кат.: ',l.name) as client_info
        FROM transportation a
            join user c on a.user_id = c.id
            join street e on a.a_street_id = e.id
            join street f on a.b_street_id = f.id
            join client i on i.id = a.client_id
            left join contact j on j.client_id = i.id and j.type_id = 1
            join category k on a.category_id = k.id
            join kateg l on k.kateg_id = l.id
            join doc m on k.doc_id = m.id
            join territory n on e.territory_id=n.id
            join territory o on f.territory_id=o.id
        WHERE
            a.car_id = :carId AND
            DATE(a.a_dt) = DATE(:aDt) AND
            a.status_id in (2, 3)
        ORDER BY
            a.a_dt`;
        
    models.sequelize.query(
            sql,
            {
                replacements: { 
                    carId: carId,
                    aDt: aDt
            }, 
            type: models.sequelize.QueryTypes.SELECT 
        })
        .then(
        function(values) {                      
            // Если необходим файл
            if (getFile) {
                var user = req.user;
                if (user !== undefined) user = user.toJSON();
                
                dbreports.getC(values, user, carId, aDt, res);                        
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

module.exports = router;