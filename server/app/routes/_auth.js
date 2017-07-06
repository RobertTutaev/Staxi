var express = require('express');
var router = express.Router();
var models = require('../models');
var resp = require('../lib/resp');
var passport= require('passport');

var mustAuthenticatedMw = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        var err = new Error('Unauthorized');
        err.status = 401;
        next(err);
    }
};

router.all('/api/*', mustAuthenticatedMw);

router.route('/signin')
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

router.route('/signout')
    .post(function(req, res) {
        req.logout();
        return  res.json(resp({
                    data: 'Вы отключены'
                }));
});

module.exports = router;