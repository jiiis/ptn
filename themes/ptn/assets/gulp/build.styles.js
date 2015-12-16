'use strict';

var gulp = require('gulp'),
    paths = require('./paths'),
    $ = require('./plugins'),
    lessPlugins = [
        new $.lessPluginCleanCss({
            advanced: true
        })
    ];

gulp.task('build:styles', function() {
    return gulp.src(paths.styles.file.src)
        .pipe($.less({
            plugins: lessPlugins
        }))
        .pipe(gulp.dest(paths.styles.dir.dist));
});
