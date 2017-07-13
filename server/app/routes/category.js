var express = require('express');
var router = express.Router();
var models = require('../models');
var resp = require('../lib/resp');

router.route('/c:id')
  .get(function(req, res, next) {
    models.sequelize.query(
        "SELECT a.*, b.name as kateg, trim(concat(c.first_name,' ',c.last_name)) as user, d.name as doc "+
        "FROM category a left join kateg b on a.kateg_id = b.id join user c on a.user_id = c.id join doc d on a.doc_id = d.id "+
        "WHERE a.client_id = "+ parseInt(req.params.id), models.value )

        .spread(function(values, metadata) {
            res.json(resp({
                data: values
            }));
        });
});

router.route('/:id')
  .get(function(req, res, next) {
    
    models.category.findById(parseInt(req.params.id))
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

    models.category.create(req.body).then(
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
      
    req.body.dtm=new Date();

    models.category.update(
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
      
    models.category.destroy({
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