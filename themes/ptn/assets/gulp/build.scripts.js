'use strict';

var $ = require('gulp'),
    $$ = require('./config.plugins'),
    paths = require('./config.paths'),
    argv = $$.yargs.argv,
    isEnvProd = argv.env === 'prod';

$.task('build:scripts:shared', function() {
    return $.src(paths.scripts.src.vendors.files.concat([
        paths.scripts.src.app.file
    ]))
        .pipe($$.concat('shared.js'))
        .pipe($$.if(isEnvProd, $$.uglify({
            preserveComments: false
        })))
        .pipe($.dest(paths.scripts.dist.dir));
});

$.task('build:scripts', function(done) {
    return $$.runSequence(
        'build:scripts:shared',
        done
    );
});
