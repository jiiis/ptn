'use strict';

var gulp = require('gulp'),
    $ = require('./config.plugins');

gulp.task('build', function(done) {
    $.runSequence(
        'clean',
        'build:styles',
        done
    );
});
