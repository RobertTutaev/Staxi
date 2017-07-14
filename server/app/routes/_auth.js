var express = require('express');
var router = express.Router();
var models = require('../models');
var resp = require('../lib/resp');
var passport= require('passport');

var respError401 = resp({
    rslt: false, 
    status: 401, 
    msg: 'Unauthorized'
});

var respError403 = resp({
    rslt: false, 
    status: 403, 
    msg: 'Forbidden'
});

var mustAuthenticatedMw = function (req, res, next) {
    if (req.isAuthenticated()) next();
    else res.json(respError401);
};

function granted(req, res, next, roles) {
    var user = req.user;

    if (req.isAuthenticated() && user !== undefined) {
        
        models.user.findById(parseInt(user.id)).then(
            function(value) {                
                if (roles.some(role => !!value[role])) next();
                else res.json(respError403);
            }, 
            function(err) {
                res.json(respError403);
            }
        );

    } else {
        res.json(respError403);
    }
}
//=============================================================================

//1. Проверим авторизацию для всех маршрутов
router.all('/api*', mustAuthenticatedMw);

//2. Проверяем права водителя (role1)
router.get(['/api/transportation*'
        ], 
        function (req, res, next) {
            granted(req, res, next, ['role1', 'role2', 'role3', 'role4']);
        });

router.put(['/api/transportation*'
        ],
        function (req, res, next) {
            granted(req, res, next, ['role1', 'role2', 'role3', 'role4']);
        });

//3. Проверяем права оператора (role2) и координатора (role3)
router.get(['/api/territory*',
            '/api/street*',
            '/api/kateg*',
            '/api/punkt*',
            '/api/firm*',
            '/api/doc*',
            '/api/car*',
            '/api/type*'
        ], 
        function (req, res, next) {
            granted(req, res, next, ['role2', 'role3', 'role4']);
        });

router.all([
            '/api/client*',
            '/api/contact*',
            '/api/category*',
            '/api/transportation*'
        ], 
        function (req, res, next) {
            granted(req, res, next, ['role2', 'role3', 'role4']);
        });

// 4. Проверяем права администратора (role4)
router.put(['/api/user*',
            '/api/territory*',
            '/api/street*',
            '/api/kateg*',
            '/api/punkt*',
            '/api/firm*',
            '/api/doc*',
            '/api/car*',
            '/api/type*'
        ], 
        function (req, res, next) {
            granted(req, res, next, ['role4']);
        });

router.post([
            '/api/user*',
            '/api/territory*',
            '/api/street*',
            '/api/kateg*',
            '/api/punkt*',
            '/api/firm*',
            '/api/doc*',
            '/api/car*',
            '/api/type*'
        ], 
        function (req, res, next) {
            granted(req, res, next, ['role4']);
        });

router.delete([
            '/api/user*',
            '/api/territory*',
            '/api/street*',
            '/api/kateg*',
            '/api/punkt*',
            '/api/firm*',
            '/api/doc*',
            '/api/car*',
            '/api/type*'
        ], 
        function (req, res, next) {
            granted(req, res, next, ['role4']);
        });

//=============================================================================
router.route('/auth/issign')
  .get(function(req, res, next) {    
    var user = req.user;    
    if (req.isAuthenticated() && user !== undefined) {
        res.json(resp({
            data: user.toJSON()
        }))    
    } else {
        res.json(resp({
            status: 401,
            rslt: false,
            msg: 'Подключение отсутствует'
        }))
    }
});

router.route('/auth/signin')
    .post(function(req, res, next) {
        passport.authenticate(
                'local',
                function(err, user, info) {
                    return err
                        ? res.json(resp({
                            status: err.status,
                            rslt: false,
                            msg: 'Не удалось подключиться: ' + err.message
                          }))
                        : user
                        ? req.logIn(user, function(err) {
                            return err
                                ? res.json(resp({
                                    status: err.status,
                                    rslt: false,
                                    msg: 'Не удалось подключиться: ' + err.message
                                  }))
                                : res.json(resp({
                                    data: user
                                  }))
                            })
                        : res.json(resp({
                            data: user
                          }))
                }
            )(req, res, next);
});

router.route('/auth/signout')
    .post(function(req, res) {
        req.logout();
        req.session.destroy();
        res.json(respError401);
});

module.exports = router;