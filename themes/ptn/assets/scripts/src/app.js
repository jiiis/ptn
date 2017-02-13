'use strict';

(function(window) {
    /******************** private variables ********************/
    var _isDeviceMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
        _screenWidths = {
            lg: 1200
        },
        _dataAttributes = {
            accountBlockTrigger: 'ptn-account-block-trigger',
            dropdownTrigger: 'ptn-dropdown-trigger'
        },
        _selectors = {
            pageLoader: '#page-loader',
            header: '#header',
            main: '#main',
            aside: '#aside',
            asideTrigger: '#aside-trigger',
            listItem: '.ptn-list__item',
            listItemActive: '.ptn-list__item_active',
            listLink: '.ptn-list__link',
            sublist: '.ptn-list_sublist',
            sublistTrigger: '.ptn-list__item_sublist > .ptn-list__link',
            dropdown: '.ptn-dropdown',
            dropdownTrigger: '.ptn-dropdown__trigger',
            dropdownTriggerGeneral: '[' + _dataAttributes.dropdownTrigger + ']',
            accountBlockTrigger: '[' + _dataAttributes.accountBlockTrigger + ']',
            accountBlock: '.ptn-account-block',
            accountBlockSubmit: '.ptn-account-block__submit',
            inputBlock: '.ptn-input-block',
            inputBlockInputText: '.ptn-input-block__input-text'
        },
        // Disabled because localStorage doesn't work in private browsing.
        // _localStorageKeys = {
        //     statusAside: 'ptn-status-aside'
        // },
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
            slide: 200,
            click: 500,
            fade: 500
        },
        _delay = {
            pageLoader: 500
        },
        _$window = $(window),
        _$document = $(document),
        _$html = $('html'),
        _$body = $('body');

    /******************** mobile device class ********************/
    if (_isDeviceMobile) {
        _$html.addClass(_classes.htmlMobileDevice);
    }

    /******************** event: DOM ready ********************/
    $(function() {
        /******************** disable pinch-to-zoom for iOS safari ********************/
        _$document.on('gesturestart', function(e) {
            e.preventDefault();
        });

        /******************** widget: waves ********************/
        (function() {
            Waves.attach(_selectors.listLink, ['waves-light']);
            Waves.attach(_selectors.accountBlockSubmit);

            Waves.init({
                duration: _animationDurations.click
            });
        })();

        /******************** widget: scrollbar ********************/
        (function() {
            _addScrollBar($(_selectors.aside), 'minimal-dark', 'y');
        })();

        /******************** widget: aside | toggle ********************/
        // Disabled because localStorage doesn't work in private browsing.
        // (function() {
        //     var asideStatus = localStorage.getItem(_localStorageKeys.statusAside);
        //
        //     if (asideStatus === _statuses.on) {
        //         _toggleAsideStatelessly(_actions.show);
        //     }
        //
        //     _$body.on('click touchend', _selectors.asideTrigger, function(e) {
        //         e.preventDefault();
        //
        //         _toggleAside();
        //     });
        // })();

        (function() {
            _$body.on('click touchend', _selectors.asideTrigger, function(e) {
                e.preventDefault();

                _toggleAside();
            });

            _$body.on('click touchend', function(e) {
                var $target = $(e.target),
                    isTargetInAside = $target.closest(_selectors.aside).length > 0
                        || $target.closest(_selectors.asideTrigger).length > 0;

                if (isTargetInAside || _$document.width() >= _screenWidths.lg) {
                    return;
                }

                _closeAside();
            });
        })();

        /******************** widget: sublist | init ********************/
        (function() {
            _resetSublists();
        })();

        /******************** widget: sublist | toggle ********************/
        (function() {
            _$body.on('click touchend', _selectors.sublistTrigger, function(e) {
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

        /******************** widget: dropdown | toggle ********************/
        (function() {
            _$body.on('click touchend', _selectors.dropdownTrigger, function(e) {
                e.preventDefault();

                var $dropdownTrigger = $(this),
                    $dropdown = $dropdownTrigger.closest(_selectors.dropdown);

                $dropdownTrigger.toggleClass(_classes.triggerOn);
                $dropdown.toggleClass(_classes.widgetOn);
            });

            _$body.on('click touchend', _selectors.dropdownTriggerGeneral, function(e) {
                e.preventDefault();
                e.stopPropagation();

                var dropdownId = $(this).attr(_dataAttributes.dropdownTrigger),
                    $dropdown = $('#' + dropdownId),
                    $dropdownTrigger = $dropdown.find(_selectors.dropdownTrigger);

                $dropdownTrigger.addClass(_classes.triggerOn);
                $dropdown.addClass(_classes.widgetOn);
            });

            _$body.on('click touchend', function(e) {
                var $target = $(e.target),
                    isTargetInDropdown = $target.closest(_selectors.dropdown).length > 0;

                if (isTargetInDropdown) {
                    return;
                }

                $(_selectors.dropdownTrigger).removeClass(_classes.triggerOn);
                $(_selectors.dropdown).removeClass(_classes.widgetOn);
            });
        })();

        /******************** widget: account block | switch ********************/
        (function() {
            _switchAccountBlock('account-block-sign-up');
            _switchAccountBlock('account-block-update');

            _$body.on('click touchend', _selectors.accountBlockTrigger, function(e) {
                e.preventDefault();

                var accountBlockId = $(this).attr(_dataAttributes.accountBlockTrigger);

                _switchAccountBlock(accountBlockId);
            });
        })();

        /******************** widget: input block | focus ********************/
        (function() {
            _$body.on('focus', _selectors.inputBlockInputText, function(e) {
                e.preventDefault();

                $(this).closest(_selectors.inputBlock).addClass(_classes.widgetOn);
            }).on('blur', _selectors.inputBlockInputText, function(e) {
                e.preventDefault();

                $(this).closest(_selectors.inputBlock).removeClass(_classes.widgetOn);
            });
        })();
    });

    /******************** event: page load ********************/
    _$window.on('load', function() {
        /******************** widget: page loader ********************/
        var $pageLoader = $(_selectors.pageLoader);

        if (_isElementExistent($pageLoader)) {
            window.setTimeout(function() {
                $pageLoader.fadeOut(_animationDurations.fade);
                $(_selectors.header).fadeIn(_animationDurations.fade);
                $(_selectors.aside).fadeIn(_animationDurations.fade);
                $(_selectors.main).fadeIn(_animationDurations.fade);
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

    // Disabled because localStorage doesn't work in private browsing.
    // function _toggleAside() {
    //     var statusOld = localStorage.getItem(_localStorageKeys.statusAside),
    //         statusNew = statusOld === _statuses.on ? _statuses.off : _statuses.on,
    //         $asideTrigger = $(_selectors.asideTrigger),
    //         $aside = $(_selectors.aside);
    //
    //     localStorage.setItem(_localStorageKeys.statusAside, statusNew);
    //
    //     _$body.toggleClass(_classes.bodyAsideOn);
    //     $asideTrigger.toggleClass(_classes.triggerOn);
    //     $aside.toggleClass(_classes.widgetOn);
    //
    //     statusNew === _statuses.on && _resetSublists();
    //     _scrollTo($aside, 'top');
    // }

    function _toggleAside() {
        var $asideTrigger = $(_selectors.asideTrigger),
            $aside = $(_selectors.aside);

        _$body.toggleClass(_classes.bodyAsideOn);
        $asideTrigger.toggleClass(_classes.triggerOn);
        $aside.toggleClass(_classes.widgetOn);

        _$body.hasClass(_classes.bodyAsideOn) && _resetSublists();
        _scrollTo($aside, 'top');
    }

    function _closeAside() {
        var $asideTrigger = $(_selectors.asideTrigger),
            $aside = $(_selectors.aside);

        _$body.removeClass(_classes.bodyAsideOn);
        $asideTrigger.removeClass(_classes.triggerOn);
        $aside.removeClass(_classes.widgetOn);
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

    function _switchAccountBlock(accountBlockId) {
        var $accountBlocks = $(_selectors.accountBlock),
            $accountBlock = $('#' + accountBlockId);

        if (!_isElementExistent($accountBlock)) {
            return;
        }

        $accountBlocks.removeClass(_classes.widgetOn);
        $accountBlock.addClass(_classes.widgetOn);
    }
})(window);
