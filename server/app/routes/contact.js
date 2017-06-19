var express = require('express');
var router = express.Router();
var models = require('../models');
var resp = require('../lib/resp');

router.route('/c:id')
  .get(function(req, res, next) {
    console.log(parseInt(req.params.id));
    models.sequelize.query(
        "SELECT a.*, b.style as type, trim(concat(c.first_name,' ',c.last_name)) as user "+
        "FROM contact a left join type b on a.type_id = b.id join user c on a.user_id = c.id "+
        "WHERE a.client_id = "+ parseInt(req.params.id), models.value )

        .spread(function(values, metadata) {
            res.json(resp({
                data: values
            }));
        });
});

router.route('/:id')
  .get(function(req, res, next) {
    
    models.contact.findById( parseInt(req.params.id) )
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
    req.body.user_id=1;
    models.contact.create(req.body).then(
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
      
    models.contact.update(
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
      
    models.contact.destroy({
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