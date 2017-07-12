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

function granted(req, res, next, role) {
    var user = req.user;
    if (req.isAuthenticated() && user !== undefined && !!user[role]) next();
    else res.json(respError403);
}

var grantedRole0 = function (req, res, next) {
    granted(req, res, next, 'role0');
};

var grantedRole1 = function (req, res, next) {
    granted(req, res, next, 'role1');
};

var grantedRole2 = function (req, res, next) {
    granted(req, res, next, 'role2');
};

var grantedRole3 = function (req, res, next) {
    granted(req, res, next, 'role3');
};

var grantedRole4 = function (req, res, next) {
    granted(req, res, next, 'role4');
};
//=============================================================================

// Проверим авторизацию для всех маршрутов
router.all('/api*', mustAuthenticatedMw);

// Проверяем права администратора
router.all('/api/user*', grantedRole4);
router.all(['/api/territory/:id',
            '/api/street/:id',
            '/api/kateg/:id',
            '/api/punkts/:id',
            '/api/firm/:id',
            '/api/doc/:id',
            '/api/car/:id',
            '/api/type/:id'
        ], grantedRole4);
router.post(['/api/territory',
            '/api/street',
            '/api/kateg',
            '/api/punkts',
            '/api/firm',
            '/api/doc',
            '/api/car',
            '/api/type'
        ], grantedRole4);

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