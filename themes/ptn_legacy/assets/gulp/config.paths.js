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
            shared: {
                file: path.join(dirStyles, 'src', 'app.less'),
                files: path.join(dirStyles, 'src', '**/*')
            },
            pages: {
                album: {
                    file: path.join(dirStyles, 'src', 'album.less')
                }
            }
        },
        dist: {
            dir: path.join(dirStyles, 'dist'),
            files: path.join(dirStyles, 'dist', '**/*'),
            url: '/themes/ptn_legacy/assets/styles/dist',
            shared: {
                file: path.join(dirStyles, 'dist', 'app.css'),
                blessed: {
                    dir: path.join(dirStyles, 'dist', 'blessed'),
                    files: path.join(dirStyles, 'dist', 'blessed', '**/*.css')
                }
            },
            pages: {
                album: {
                    file: path.join(dirStyles, 'dist', 'album.css')
                }
            }
        }
    },
    scripts: {
        dir: dirScripts,
        src: {
            shared: {
                top: {
                    files: [
                        path.join(dirVendors, 'bower', 'selectivizr', 'selectivizr.js'),
                        path.join(dirVendors, 'bower', 'respond', 'dest', 'respond.src.js'),
                        path.join(dirVendors, 'bower', 'html5shiv', 'dist', 'html5shiv.js')
                    ]
                },
                bottom: {
                    files: [
                        path.join(dirVendors, 'bower', 'jquery', 'dist', 'jquery.js'),
                        path.join(dirVendors, 'bower', 'bootstrap', 'dist', 'js', 'bootstrap.js'),
                        path.join(dirVendors, 'bower', 'malihu-custom-scrollbar-plugin', 'jquery.mCustomScrollbar.js'),
                        path.join(dirVendors, 'bower', 'Waves', 'dist', 'waves.js'),
                        path.join(dirScripts, 'src', 'app.js')
                    ]
                }
            },
            pages: {
                album: {
                    files: [
                        path.join(dirVendors, 'bower', 'lightgallery', 'dist', 'js', 'lightgallery-all.js'),
                        path.join(dirScripts, 'src', 'album.js')
                    ]
                }
            }
        },
        dist: {
            dir: path.join(dirScripts, 'dist'),
            files: path.join(dirScripts, 'dist', '**/*'),
            url: '/themes/ptn_legacy/assets/scripts/dist'
        }
    },
    vendors: {
        dir: dirVendors,
        styles: {
            files: path.join(dirVendors, '**/*.@(less|css)')
        }
    }
};
