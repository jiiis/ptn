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
    return gulp.src(paths.styles.src.file)
        .pipe($.less({
            plugins: lessPlugins
        }))
        .pipe(gulp.dest(paths.styles.dist.dir));
});

gulp.task('build:styles:bless', function() {
    return gulp.src(paths.styles.dist.file)
        .pipe($.sakugawa({
            maxSelectors: 4000,
            mediaQueries: 'separate',
            suffix: '-'
        }))
        .pipe(gulp.dest(paths.styles.dist.blessed.dir));
});

gulp.task('build:styles', function(done) {
    return $.runSequence(
        'build:styles:less',
        'build:styles:bless',
        done
    );
});
