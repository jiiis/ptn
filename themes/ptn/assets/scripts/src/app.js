'use strict';

(function(window) {
    /******************** private variables ********************/
    var _isDeviceMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
        _selectors = {
            pageLoader: '#page-loader',
            asideTrigger: '#aside-trigger',
            aside: '#aside',
            listItem: '.ptn-list__item',
            listItemActive: '.ptn-list__item_active',
            listLink: '.ptn-list__link',
            sublist: '.ptn-list_sublist',
            sublistTrigger: '.ptn-list__item_sublist > .ptn-list__link'
        },
        _localStorageKeys = {
            statusAside: 'ptn-status-aside'
        },
        _classes = {
            triggerOn: 'ptn-util__trigger_on',
            widgetOn: 'ptn-util__widget_on',
            htmlMobileDevice: 'ptn-html_mobile-device',
            bodyAsideOn: 'ptn-body_aside-on'
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

    /******************** event: DOM ready ********************/
    $(function() {
        /******************** widget: scrollbar ********************/
        (function() {
            _addScrollBar($(_selectors.aside), 'minimal-dark', 'y');
        })();

        /******************** widget: aside | toggle ********************/
        (function() {
            var asideStatus = localStorage.getItem(_localStorageKeys.statusAside);

            if (asideStatus === _statuses.on) {
                _toggleAsideStatelessly(_actions.show);
            }

            _$body.on('click', _selectors.asideTrigger, function(e) {
                e.preventDefault();

                _toggleAside();
            });
        })();

        /******************** widget: sublist | init ********************/
        (function() {
            _resetSublists();
        })();

        /******************** widget: sublist | toggle ********************/
        (function() {
            _$body.on('click', _selectors.sublistTrigger, function(e) {
                e.preventDefault();

                _toggleSublist($(this));
            });

            function _toggleSublist($trigger) {
                var isSublistOn = $trigger.hasClass(_classes.triggerOn),
                    $listItemClosest = $trigger.closest(_selectors.listItem);

                if (isSublistOn) {
                    $listItemClosest.find(_selectors.sublist).slideUp(_animationDurations.slide);
                    $listItemClosest.find(_selectors.listLink).removeClass(_classes.triggerOn);
                } else {
                    $trigger.next(_selectors.sublist).slideDown(_animationDurations.slide);
                    $trigger.addClass(_classes.triggerOn);
                }
            }
        })();
    });

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

    function _addScrollBar($element, theme, mouseWheelAxis) {
        if (!_isElementExistent($element)) {
            return;
        }

        $element.mCustomScrollbar({
            theme: theme,
            scrollInertia: 100,
            axis: 'y',
            mouseWheel: {
                preventDefault: true,
                enable: true,
                axis: mouseWheelAxis
            }
        });
    }

    function _scrollTo($element, position) {
        $element.mCustomScrollbar('scrollTo', position, {
            scrollInertia: 0
        });
    }

    function _toggleAside() {
        var statusOld = localStorage.getItem(_localStorageKeys.statusAside),
            statusNew = statusOld === _statuses.on ? _statuses.off : _statuses.on,
            $asideTrigger = $(_selectors.asideTrigger),
            $aside = $(_selectors.aside);

        localStorage.setItem(_localStorageKeys.statusAside, statusNew);

        _$body.toggleClass(_classes.bodyAsideOn);
        $asideTrigger.toggleClass(_classes.triggerOn);
        $aside.toggleClass(_classes.widgetOn);

        statusNew === _statuses.on && _resetSublists();
        _scrollTo($aside, 'top');
    }

    function _toggleAsideStatelessly(action) {
        var $asideTrigger = $(_selectors.asideTrigger),
            $aside = $(_selectors.aside);

        if (action === _actions.show) {
            _$body.addClass(_classes.bodyAsideOn);
            $asideTrigger.addClass(_classes.triggerOn);
            $aside.addClass(_classes.widgetOn);
        } else if (action === _actions.hide) {
            _$body.removeClass(_classes.bodyAsideOn);
            $asideTrigger.removeClass(_classes.triggerOn);
            $aside.removeClass(_classes.widgetOn);
        }

        _resetSublists();
        _scrollTo($aside, 'top');
    }

    function _resetSublists() {
        var $activeListItemAncestors = $(_selectors.listItemActive).parents();

        $(_selectors.sublist).hide();
        $(_selectors.sublistTrigger).removeClass(_classes.triggerOn);

        $activeListItemAncestors.each(function() {
            var $listItem = $(this);

            $listItem.children(_selectors.sublist).show();
            $listItem.children(_selectors.sublistTrigger).addClass(_classes.triggerOn);
        });
    }
})(window);
