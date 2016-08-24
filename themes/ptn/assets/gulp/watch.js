'use strict';

var $ = require('gulp'),
    paths = require('./config.paths');

$.task('watch', ['build'], function() {
    $.watch([
        paths.styles.src.shared.files,
        paths.styles.src.pages.album.file,
        paths.vendors.styles.files
    ], ['build:styles']);

    $.watch(paths.scripts.src.shared.top.files, ['build:scripts:shared-top']);

    $.watch(paths.scripts.src.shared.bottom.files, ['build:scripts:shared-bottom']);

    $.watch(paths.scripts.src.pages.album.files, ['build:scripts:album']);
});
