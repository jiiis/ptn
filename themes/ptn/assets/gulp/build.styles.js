'use strict';

var $ = require('./plugins'),
    gulp = require('gulp'),
    paths = require('./paths'),
    argv = $.yargs.argv,
    isEnvProd = argv.env === 'prod';

gulp.task('build:styles:less', function() {
    return gulp.src(paths.styles.src.file)
        .pipe($.less({
            plugins: [
                new $.lessPluginAutoprefix({
                    browsers: ['last 2 versions']
                }),
                new $.lessPluginCsscomb()
            ]
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
    return gulp.src([
        paths.styles.dist.file,
        paths.styles.dist.blessed.files
    ], {
        base: paths.styles.dist.dir
    })
        .pipe($.sourcemaps.init())
        .pipe($.if(isEnvProd, $.minifyCss({
            compatibility: 'ie8',
            keepSpecialComments: 0
        })))
        .pipe($.sourcemaps.write('./'))
        .pipe(gulp.dest(paths.styles.dist.dir));
});

gulp.task('build:styles', function(done) {
    return $.runSequence(
        'build:styles:less',
        'build:styles:bless',
        'build:styles:minify',
        done
    );
});
