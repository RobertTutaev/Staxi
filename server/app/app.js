'use strict';

var env             = process.env.NODE_ENV || 'development';
var express         = require('express');
var path            = require('path');
var logger          = require('morgan');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var session         = require('express-session');
var bcrypt          = require('bcrypt-nodejs');
var path            = require('path');
var passport        = require('passport');
var LocalStrategy   = require('passport-local').Strategy;
var models          = require('./models/index');
var config          = require('./config/config.json')[env];
var app             = express();
var cors            = require('cors');
var resp            = require('./lib/resp');
var models          = require('./models');

if (app.get('env') === 'development') {
  app.use(require('connect-livereload')({
    port: config.portLiveReload
  }));
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'test',
    saveUninitialized: false,
    resave: false}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());    // {origin: '*'}

require('./routes')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json(resp({
        status: err.status,
        rslt: false,
        msg: 'Ошибка: ' + err.message
    }));
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json(resp({
      status: err.status,
      rslt: false,
      msg: 'Ошибка: ' + err.message
  }));
});

// Работаем с passport =========================================================
passport.use(new LocalStrategy(function(username, password, done) {
    models.user.find({ where: { username: username } }).then(
        function(data) {
            var user = data;
            if(user === null) {
                return done(null, false, {message: 'Неверный логин!'});
            } else {
                user = data.toJSON();
                if(!bcrypt.compareSync(password, user.password)) {
                    return done(null, false, {message: 'Неверный пароль!'});
                } else {
                    return done(null, user);
                }
            }
        }, 
        function(err) {
            return done(err);
        }
    );    
}));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    models.user.findById(id).then(
        function(user){
            return done(null, user);
        },
        function(err) {
            return done(err);
        }
    );
});

module.exports = app;