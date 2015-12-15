'use strict';

var path = require('path'),
    dirAssets = path.join(__dirname, '..'),
    dirStyles = path.join(dirAssets, 'styles'),
    dirStylesSrc = path.join(dirStyles, 'src'),
    dirStylesDist = path.join(dirStyles, 'dist');

module.exports = {
    'dir-assets': dirAssets,
    'dir-styles-src': dirStylesSrc,
    'dir-styles-dist': dirStylesDist,
    'file-styles-src': path.join(dirStylesSrc, 'ptn.less')
};
