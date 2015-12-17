'use strict';

var $ = require('./plugins'),
    gulp = require('gulp'),
    paths = require('./paths'),
    argv = $.yargs.argv,
    lessPlugins = [
        new $.lessPluginAutoprefix({
            browsers: ['last 2 versions']
        })
    ];

if (argv.env === 'prod') {
    lessPlugins.push(new $.lessPluginCleanCss({
        advanced: true
    }));
}

gulp.task('build:styles:less', function() {
    return gulp.src(paths.styles.file.src)
        .pipe($.less({
            plugins: lessPlugins
        }))
        .pipe(gulp.dest(paths.styles.dir.dist));
});

gulp.task('build:styles:bless', function() {
    return gulp.src(paths.styles.file.dist)
        .pipe($.bless())
        .pipe(gulp.dest(paths.styles.dir.dist + '/blessed'));
});

gulp.task('build:styles', function(done) {
    return $.runSequence(
        'build:styles:less',
        'build:styles:bless',
        done
    );
});
