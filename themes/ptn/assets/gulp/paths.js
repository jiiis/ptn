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
        src: {
            dir: dirStylesSrc,
            file: path.join(dirStylesSrc, 'ptn.less')
        },
        dist: {
            dir: dirStylesDist,
            file: path.join(dirStylesDist, 'ptn.css'),
            blessed: {
                dir: path.join(dirStylesDist, 'blessed')
            }
        }
    }
};
