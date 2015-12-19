'use strict';

var gulp = require('gulp'),
    paths = require('./paths'),
    $ = require('./plugins');

gulp.task('clean', function(done) {
    return $.del([
        paths.styles.dist.files
    ], done);
});
