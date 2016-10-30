'use strict';

var $ = require('gulp');
var $$ = require('./config.plugins');
var paths = require('./config.paths');

$.task('clean', function(done) {
    return $$.del([
        paths.styles.dist.files,
        paths.scripts.dist.files
    ], done);
});
