'use strict';

var path = require('path'),
    dirAssets = path.join(__dirname, '..'),
    dirStyles = path.join(dirAssets, 'styles'),
    dirStylesSrc = path.join(dirStyles, 'src'),
    dirStylesDist = path.join(dirStyles, 'dist');

module.exports = {
    assets: {
        dir: dirAssets
    },
    styles: {
        dir: {
            src: dirStylesSrc,
            dist: dirStylesDist
        },
        file: {
            src: path.join(dirStylesSrc, 'ptn.less')
        }
    }
};
