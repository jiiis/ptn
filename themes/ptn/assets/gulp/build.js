'use strict';

var gulp = require('gulp'),
    $ = require('./plugins');

gulp.task('build', function(done) {
    $.runSequence(
        'build:styles',
        done
    );
});
