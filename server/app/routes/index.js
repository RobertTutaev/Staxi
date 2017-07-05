
var _ = require('lodash');
var fs = require('fs');
var excluded = ['index'];

module.exports = function(app) {
  fs.readdirSync(__dirname).forEach(function(file) {
    // Remove extension from file name
    var basename = file.split('.')[0];
    
    // Sessions
    app.use(require('./_session.js'));

    // Only load files that aren't directories and aren't blacklisted
    if (!fs.lstatSync(__dirname + '/' + file).isDirectory() && 
        !_.includes(excluded, basename) &&
        file.charAt(0) !== '_' ) {
            app.use('/api/' + basename, require('./' + file));
    }
  });
};

/*


router.del('/', loadUser, function(req, res) {
  // Удалить сессию
  if (req.session) {
    req.session.destroy(function() {});
  }
  res.redirect('/new');
}); 

function loadUser(req, res, next) {
  if (req.session.user_id) {
    User.findById(req.session.user_id, function(user) {
      if (user) {
        req.currentUser = user;
        next();
      } else {
        res.redirect('/sessions/new');
      }
    });
  } else {
    res.redirect('/sessions/new');
  }
}












// Работаем с маршрутами
var env     = process.env.NODE_ENV || 'development';
var express = require('express');
var router  = express.Router();
var passport= require('passport');
var bcrypt  = require('bcrypt-nodejs');
var models  = require('../models/index');

// Требуем аунтефикации для доступа к маршрутам
var mustAuthenticatedMw = function (req, res, next) {
    req.isAuthenticated()
        ? next()
        : res.redirect('/signin');
};
router.all(['/upload', '/show'], mustAuthenticatedMw);

// Требуем прав администратора для доступа к маршрутам
var mustAdminMw = function (req, res, next){
    var user = req.user;
    if(user !== undefined) {
        user = user.toJSON();
    }
    
    user.is_admin
        ? next()
        : res.redirect('/');
};
router.all(['/show'], mustAdminMw);

// Основные маршруты ===========================================================

// Вход
var signInPost = function(req, res, next) {
    passport.authenticate(
        'local', 
        { 
            successRedirect: '/',        
            failureRedirect: '/signin'
        }, 
        function(err, user, info) {
                if(err) {
                    return 
                        res.json({
                            rslt: false,
                            msg: 'Ошибка: ' + err.message
                        });
                }
                
                if(!user) {
                    return 
                        res.json({
                            rslt: false,
                            msg: 'Ошибка: ' + info.message
                        });
                }

                return req.logIn(user, function(err) {                    
                    if(err) {
                        return 
                            res.json({
                                rslt: false,
                                msg: 'Ошибка: ' + err.message
                            });
                    } else {                        
                        return 
                            res.json({
                                rslt: true,
                                msg: 'Пользователь зашел в личный кабинет!'
                            });
                    }
                });
        })(req, res, next);
    };
   
router.post('/signin', signInPost);

// Выход
router.get('/signout', function(req, res, next) {
    if(!req.isAuthenticated()) {
        res.json({
            rslt: false,
            msg: 'Пользователь не авторизован!'
        });
    } else {
        req.logout();
        res.json({
            rslt: true,
            msg: 'Пользователь вышел из личного кабинета!'
        });
    }
});

// Регистрация
router.post('/signup', function(req, res, next) {    
    models.users.create(req.body).then(
        function(user) {
            signInPost(req, res, next);
            res.json({
                rslt: true,
                msg: 'Пользователь создан!'
            });
        }, 
        function(err) {
            res.json({
                rslt: false,
                msg: 'Не удалось создать пользователя! Возможно пользователь уже существует?! Ошибка: ' + err.message
            });
        }
    );
});

// Список улиц
router.post('/street', function(req, res, next) {
    if (!req.body.city_id) {
        var id = 0;
    } else {
        var id = req.body.city_id;
    }

    models.street.findAll({
            attributes: ["street_id", "socr", "name", "post"],
            where: {"city_id": id}
        })
        .then(
        function(streets) {
            signInPost(req, res, next);
            res.json({
                rslt: true,
                msg: 'Список улиц получен!',
                data: streets
            });
        }, 
        function(err) {
            res.json({
                rslt: false,
                msg: 'Не удалось получить список улиц! Ошибка: ' + err.message
            });
        }
    );
});

module.exports = router;*/