'use strict';

var $ = require('gulp');
var $$ = require('./config.plugins');
var paths = require('./config.paths');

var argv = $$.yargs.argv,
    isEnvProd = argv.env === 'prod';

$.task('build:scripts:shared-top', function() {
    return $.src(paths.scripts.src.shared.top.files)
        .pipe($$.plumber())
        .pipe($$.if(isEnvProd, $$.sourcemaps.init()))
        .pipe($$.concat('shared-top.js'))
        .pipe($$.if(isEnvProd, $$.uglify({
            preserveComments: false
        })))
        .pipe($$.if(isEnvProd, $$.sourcemaps.write('./', {
            sourceMappingURLPrefix: paths.scripts.dist.url
        })))
        .pipe($.dest(paths.scripts.dist.dir));
});

$.task('build:scripts:shared-bottom', function() {
    return $.src(paths.scripts.src.shared.bottom.files)
        .pipe($$.plumber())
        .pipe($$.if(isEnvProd, $$.sourcemaps.init()))
        .pipe($$.concat('shared-bottom.js'))
        .pipe($$.if(isEnvProd, $$.uglify({
            preserveComments: false
        })))
        .pipe($$.if(isEnvProd, $$.sourcemaps.write('./', {
            sourceMappingURLPrefix: paths.scripts.dist.url
        })))
        .pipe($.dest(paths.scripts.dist.dir));
});

$.task('build:scripts:album', function() {
    return $.src(paths.scripts.src.pages.album.files)
        .pipe($$.plumber())
        .pipe($$.if(isEnvProd, $$.sourcemaps.init()))
        .pipe($$.concat('album.js'))
        .pipe($$.if(isEnvProd, $$.uglify({
            preserveComments: false
        })))
        .pipe($$.if(isEnvProd, $$.sourcemaps.write('./', {
            sourceMappingURLPrefix: paths.scripts.dist.url
        })))
        .pipe($.dest(paths.scripts.dist.dir));
});

$.task('build:scripts', function(done) {
    return $$.runSequence([
        'build:scripts:shared-top',
        'build:scripts:shared-bottom',
        'build:scripts:album'
    ], done);
});
