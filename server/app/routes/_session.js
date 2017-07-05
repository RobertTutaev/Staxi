var express = require('express');
var router = express.Router();
var models = require('../models');
var resp = require('../lib/resp');
var passport= require('passport');

var mustAuthenticatedMw = function (req, res, next) {
    console.log(req.isAuthenticated());
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
    .post(function(req, res) {
        passport.authenticate(
                'local',
                function(err, user, info) {
                    return err 
                        ? next(err)
                        : user
                        ? req.logIn(user, function(err) {
                            return err
                                ? next(err)
                                : next();
                            })
                        : res.redirect('/');
                }
            )(req, res);
});

router.route('/signin')
    .post(function(req, res) {
        req.logout();
        res.redirect('/');
});

module.exports = router;