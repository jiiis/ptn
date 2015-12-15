'use strict';

var gulp = require('gulp'),
    paths = require('./paths'),
    $ = require('./plugins');

gulp.task('build:styles', function() {
    return gulp.src(paths['file-styles-src'])
        .pipe($.less())
        .pipe(gulp.dest(paths['dir-styles-dist']));
});
