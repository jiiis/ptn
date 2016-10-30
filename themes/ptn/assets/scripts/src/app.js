'use strict';

(function(window) {
    /******************** private variables ********************/
    var _isDeviceMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
        _selectors = {
            pageLoader: '#page-loader'
        },
        _localStorageKeys = {},
        _classes = {
            htmlMobileDevice: 'ptn-html_mobile-device'
        },
        _actions = {
            show: 'show',
            hide: 'hide'
        },
        _statuses = {
            on: 'on',
            off: 'off'
        },
        _animationDurations = {
            fade: 500,
            slide: 200
        },
        _delay = {
            pageLoader: 500
        },
        _$window = $(window),
        _$html = $('html'),
        _$body = $('body');

    /******************** mobile device class ********************/
    if (_isDeviceMobile) {
        _$html.addClass(_classes.htmlMobileDevice);
    }

    /******************** event: page load ********************/
    _$window.on('load', function() {
        /******************** widget: page loader ********************/
        var $pageLoader = $(_selectors.pageLoader);

        if (_isElementExistent($pageLoader)) {
            window.setTimeout(function() {
                $pageLoader.fadeOut(_animationDurations.fade);
            }, _delay.pageLoader);
        }
    });

    /******************** private functions ********************/
    function _isElementExistent($element) {
        return !!$element.length;
    }
})(window);
