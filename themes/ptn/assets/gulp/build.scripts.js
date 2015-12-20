'use strict';

var $ = require('gulp'),
    $$ = require('./config.plugins'),
    paths = require('./config.paths'),
    argv = $$.yargs.argv,
    isEnvProd = argv.env === 'prod';

$.task('build:scripts:shared-bottom', function() {
    return $.src(paths.scripts.src.shared.bottom.files)
        .pipe($$.sourcemaps.init())
        .pipe($$.concat('shared-bottom.js'))
        .pipe($$.if(isEnvProd, $$.uglify({
            preserveComments: false
        })))
        .pipe($$.sourcemaps.write('./'))
        .pipe($.dest(paths.scripts.dist.dir));
});

$.task('build:scripts', function(done) {
    return $$.runSequence(
        'build:scripts:shared-bottom',
        done
    );
});
