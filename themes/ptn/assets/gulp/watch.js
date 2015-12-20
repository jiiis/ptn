'use strict';

var $ = require('gulp'),
    $$ = require('./config.plugins'),
    paths = require('./config.paths');

$.task('watch', ['build'], function() {
    $.watch([
        paths.styles.src.files,
        paths.vendors.styles.files
    ], ['build:styles']);

    $.watch(paths.scripts.src.shared, ['build:scripts:shared']);
});
