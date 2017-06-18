
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
                      require('./routes')(app);

if (app.get('env') === 'development') {
  app.use(require('connect-livereload')({
    port: config.portLiveReload
  }));
}

// parse application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// parse application/vnd.api+json as json
//app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(app.router);

// parse various different custom JSON types as JSON 
//app.use(bodyParser.json({ type: 'application/*+json' })) 
// parse some custom thing into a Buffer 
//app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))
// parse an HTML body into a string 
//app.use(bodyParser.text({ type: 'text/html' }))

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'test',
    saveUninitialized: true,
    resave: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());//{origin: '*'}

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
    new models.User({username: username}).fetch().then(function(data) {
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
    });
}));

passport.serializeUser(function(user, done) {
    done(null, user.username);
});

passport.deserializeUser(function(username, done) {
    new models.User({username: username}).fetch().then(function(user) {
        done(null, user);
    });
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err,user) {
    err
      ? done(err)
      : done(null,user);
  });
});

module.exports = app;