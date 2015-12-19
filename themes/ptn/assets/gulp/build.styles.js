'use strict';

var $ = require('./plugins'),
    gulp = require('gulp'),
    paths = require('./paths'),
    argv = $.yargs.argv,
    isEnvProd = argv.env === 'prod',
    lessPlugins = [
        new $.lessPluginAutoprefix({
            browsers: ['last 2 versions']
        })
    ];

if (isEnvProd) {
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

gulp.task('build:styles:minify', function() {
    return gulp.src(paths.styles.dist.blessed.files)
        .pipe($.if(isEnvProd, $.minifyCss({
            compatibility: 'ie8'
        })))
        .pipe(gulp.dest(paths.styles.dist.blessed.dir));
});

gulp.task('build:styles', function(done) {
    return $.runSequence(
        'build:styles:less',
        'build:styles:bless',
        'build:styles:minify',
        done
    );
});
