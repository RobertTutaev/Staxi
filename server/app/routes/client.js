var express = require('express');
var router = express.Router();
var models = require('../models');
var resp = require('../lib/resp');

router.route('/')
  .get(function(req, res, next) {

    var snilsValue = (req.query.snils ? req.query.snils.replace(/[^-0-9]/gim,'') : '');
    var snils = `${snilsValue  ? snilsValue             : '%'}%`;
    var fioValue = req.query.snils ? req.query.snils.replace(/[^ а-яёА-ЯЁ]/gim,'').trim() : '';
    var fioArray = fioValue.split(/ {1,}/);
    var fam =   `${fioArray[0] ? fioArray[0].charAt(0)  : '%'}%`;
    var im =    `${fioArray[1] ? fioArray[1]            : '%'}%`;
    var ot =    `${fioArray[2] ? fioArray[2]            : '%'}%`;
    if (snilsValue === '' && fioValue === '') snils = '_';
    
    var sql =
        `SELECT a.*,
            b.name as street,
            concat(c.first_name,' ',c.last_name) as user,
            concat(d.first_name,' ',d.last_name) as userm
        FROM client a
            left join street b on a.street_id = b.id
            join user c on a.user_id = c.id
            left join user d on a.userm_id = d.id
        WHERE 
            a.snils like :snils and
            upper(a.fam) like upper(:fam) and
            upper(a.im) like upper(:im) and
            upper(a.ot) like upper(:ot)
        LIMIT 30`;

    models.sequelize.query(
        sql, { 
            replacements: { 
                snils:  snils,
                fam:    fam,
                im:     im,
                ot:     ot
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