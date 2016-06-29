'use strict';

var $ = require('gulp'),
    $$ = require('./config.plugins'),
    paths = require('./config.paths'),
    argv = $$.yargs.argv,
    isEnvProd = argv.env === 'prod';

$.task('build:styles:less', function() {
    return $.src(paths.styles.src.file)
        .pipe($$.plumber())
        .pipe($$.less({
            plugins: [
                new $$.lessPluginAutoprefix({
                    browsers: ['last 2 versions']
                }),
                new $$.lessPluginCsscomb()
            ]
        }))
        .pipe($.dest(paths.styles.dist.dir));
});

$.task('build:styles:bless', function() {
    return $.src(paths.styles.dist.file)
        .pipe($$.plumber())
        .pipe($$.sakugawa({
            maxSelectors: 4000,
            mediaQueries: 'separate',
            suffix: '-'
        }))
        .pipe($.dest(paths.styles.dist.blessed.dir));
});

$.task('build:styles:minify', function() {
    return $.src([
        paths.styles.dist.file,
        paths.styles.dist.blessed.files
    ], {
        base: paths.styles.dist.dir
    })
        .pipe($$.plumber())
        .pipe($$.if(isEnvProd, $$.sourcemaps.init()))
        .pipe($$.if(isEnvProd, $$.minifyCss({
            compatibility: 'ie8',
            keepSpecialComments: 0
        })))
        .pipe($$.if(isEnvProd, $$.sourcemaps.write('./', {
            sourceMappingURL: function(file) {
                return paths.styles.dist.url + '/' + file.relative + '.map';
            }
        })))
        .pipe($.dest(paths.styles.dist.dir));
});

$.task('build:styles', function(done) {
    return $$.runSequence(
        'build:styles:less',
        'build:styles:bless',
        'build:styles:minify',
        done
    );
});
