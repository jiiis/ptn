'use strict';

(function(window) {
    /******************** lightgallery ********************/
    $('#photos').lightGallery({
        closable: false,
        enableDrag: false,
        preload: 5,
        speed: 300,
        hideBarsDelay: 3000,
        thumbMargin: 12,
        thumbWidth: 90,
        thumbContHeight: 114
    });
})(window);
