'use strict';

(function(window) {
    /******************** lightgallery ********************/
    $('#photos').lightGallery({
        closable: false,
        easing: 'ease-in-out',
        enableDrag: false,
        hash: false,
        hideBarsDelay: 3000,
        preload: 10,
        speed: 500,
        thumbMargin: 12,
        thumbWidth: 90,
        thumbContHeight: 114
    });
})(window);
