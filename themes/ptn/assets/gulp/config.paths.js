'use strict';

var path = require('path'),
    dirAssets = path.join(__dirname, '..'),
    dirStyles = path.join(dirAssets, 'styles'),
    dirVendors = path.join(dirAssets, 'vendors');

module.exports = {
    assets: {
        dir: dirAssets
    },
    styles: {
        src: {
            dir: path.join(dirStyles, 'src'),
            file: path.join(dirStyles,'src', 'ptn.less'),
            files: path.join(dirStyles, 'src', '**/*')
        },
        dist: {
            dir: path.join(dirStyles, 'dist'),
            file: path.join(dirStyles, 'dist', 'ptn.css'),
            files: path.join(dirStyles, 'dist', '**/*'),
            blessed: {
                dir: path.join(dirStyles, 'dist', 'blessed'),
                files: path.join(dirStyles, 'dist', 'blessed', '**/*.css')
            }
        }
    },
    vendors: {
        dir: dirVendors,
        styles: {
            files: path.join(dirVendors, '**/*.@(less|css)')
        }
    }
};
