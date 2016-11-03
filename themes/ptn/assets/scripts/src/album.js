'use strict';

(function(window) {
    /******************** lightgallery ********************/
    $('#photos').lightGallery({
        easing: 'ease-in-out',
        closable: false,
        enableDrag: false,
        preload: 5,
        speed: 500,
        hideBarsDelay: 3000,
        thumbMargin: 12,
        thumbWidth: 90,
        thumbContHeight: 114
    });
})(window);
