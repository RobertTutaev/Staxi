var express = require('express');
var router = express.Router();
var models = require('../models');
var resp = require('../lib/resp');
var passport= require('passport');

var mustAuthenticatedMw = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        return  res.json(resp({
                    rslt: false,
                    status: 401,
                    msg: 'Unauthorized'
                }));
    }
};

router.all('/api/*', mustAuthenticatedMw);

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
        return  res.json(resp({
                    status: 401,
                    msq: 'Unauthorized'
                }));
});

module.exports = router;