'use strict';

var gulp = require('gulp'),
    paths = require('./paths'),
    $ = require('./plugins');

gulp.task('build:styles', function() {
    return gulp.src(paths.styles.file.src)
        .pipe($.less())
        .pipe(gulp.dest(paths.styles.dir.dist));
});
