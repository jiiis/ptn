'use strict';

var gulp = require('gulp'),
    paths = require('./config.paths'),
    $ = require('./config.plugins');

gulp.task('clean', function(done) {
    return $.del([
        paths.styles.dist.files
    ], done);
});
