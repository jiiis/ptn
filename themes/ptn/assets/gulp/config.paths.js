'use strict';

var path = require('path'),
    dirAssets = path.join(__dirname, '..'),
    dirStyles = path.join(dirAssets, 'styles'),
    dirScripts = path.join(dirAssets, 'scripts'),
    dirVendors = path.join(dirAssets, 'vendors');

module.exports = {
    assets: {
        dir: dirAssets
    },
    styles: {
        dir: dirStyles,
        src: {
            dir: path.join(dirStyles, 'src'),
            file: path.join(dirStyles, 'src', 'app.less'),
            files: path.join(dirStyles, 'src', '**/*')
        },
        dist: {
            dir: path.join(dirStyles, 'dist'),
            file: path.join(dirStyles, 'dist', 'app.css'),
            files: path.join(dirStyles, 'dist', '**/*'),
            blessed: {
                dir: path.join(dirStyles, 'dist', 'blessed'),
                files: path.join(dirStyles, 'dist', 'blessed', '**/*.css')
            }
        }
    },
    scripts: {
        dir: dirScripts,
        src: {
            shared: {
                bottom: {
                    files: [
                        path.join(dirVendors, 'bower', 'jquery', 'dist', 'jquery.js'),
                        path.join(dirVendors, 'bower', 'bootstrap', 'dist', 'js', 'bootstrap.js'),
                        path.join(dirScripts, 'src', 'app.js')
                    ]
                }
            },
            pages: {}
        },
        dist: {
            dir: path.join(dirScripts, 'dist'),
            files: path.join(dirScripts, 'dist', '**/*')
        }
    },
    vendors: {
        dir: dirVendors,
        styles: {
            files: path.join(dirVendors, '**/*.@(less|css)')
        }
    }
};
