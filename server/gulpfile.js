'use strict';

var gulp = require('gulp');
var gds = require('gulp-dev-server');

//development
gulp.task('dev', function () {
  gds.task({
    restart: ['app/bin/www', 'app/**/*.js', 'app/config/*.json'],
    notify: ['app/bin/www', 'app/**/*.js', 'app/config/*.json'],
    server: {
      environment: 'development',
      verbose: true,
      script: { path: 'app/bin/www' }
    }
  })
});

//default
gulp.task('default', ['dev']);