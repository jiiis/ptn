'use strict';

(function(window) {
    /******************** private variables ********************/
    var _isDeviceMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
        _selectors = {
            page_loader: '#page-loader',
            search: '#search',
            search_trigger: '#search-trigger',
            search_input: '#search-input input',
            search_button: '#search-button',
            aside: '#aside',
            aside_trigger: '#aside-trigger',
            account_menu: '#account-menu',
            account_menu_trigger: '#account-menu-trigger',
            notifications: '#notifications',
            dropdown: '.ptn-dropdown',
            dropdown_trigger: '.ptn-dropdown__trigger',
            dropdown_menu_active: '.ptn-dropdown.open .ptn-dropdown__menu',
            list_item: '.ptn-list__list-item',
            list_item_active: '.ptn-list__list-item_active',
            sublist: '.ptn-list__list-item-sublist',
            sublist_trigger: '.ptn-list__list-item-link_sublist',
            fullscreen_trigger: '[data-ptn-action="fullscreen"]',
            clear_notifications_trigger: '[data-ptn-action="clear-notifications"]',
        },
        _localStorageKeys = {
            status_aside: 'ptn-status-aside'
        },
        _classes = {
            trigger_on: 'ptn-util__trigger_on',
            trigger_off: 'ptn-util__trigger_off',
            widget_on: 'ptn-util__widget_on',
            widget_off: 'ptn-util__widget_off',
            html_mobile_device: 'ptn-html_mobile-device',
            body_aside_on: 'ptn-body_aside-on',
            notifications_empty: 'ptn-header-notifications_empty'
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
        _$window = $(window),
        _$html = $('html'),
        _$body = $('body');

    /******************** mobile device class ********************/
    if (_isDeviceMobile) {
        _$html.addClass(_classes.html_mobile_device);
    }

    /******************** event: DOM ready ********************/
    $(function() {
        /******************** widget: scrollbar ********************/
        (function() {
            _addScrollBar($(_selectors.aside), 'minimal-dark', 'y');
        })();

        /******************** widget: dropdown ********************/
        (function() {
            _$body.on('click', _selectors.dropdown_menu_active, function(e) {
                e.stopPropagation();
            });
        })();

        /******************** widget: search | toggle ********************/
        (function() {
            var $search = $(_selectors.search),
                $searchInput = $(_selectors.search_input);

            _$body
                .on('click', _selectors.search_trigger, function() {
                    $search.addClass(_classes.widget_on);
                    $searchInput.focus();

                    _toggleAsideStatelessly(_actions.hide);
                })
                .on('click', _selectors.search_button, function() {
                    $search.removeClass(_classes.widget_on);
                })
                .on('click', function(e) {
                    var $target = $(e.target);

                    if (!_isElementExistent($target.closest(_selectors.search)) && !_isElementExistent($target.closest(_selectors.search_trigger))) {
                        $search.removeClass(_classes.widget_on);
                    }
                });
        })();

        /******************** widget: aside | toggle ********************/
        (function() {
            var asideStatus = localStorage.getItem(_localStorageKeys.status_aside);

            if (asideStatus === _statuses.on) {
                _toggleAsideStatelessly(_actions.show);
            }

            _$body.on('click', _selectors.aside_trigger, function(e) {
                e.preventDefault();

                _toggleAside();
            });
        })();

        /******************** widget: aside | account ********************/
        (function() {
            _$body.on('click', _selectors.account_menu_trigger, function() {
                $(this).toggleClass(_classes.trigger_on);
                $(_selectors.account_menu).slideToggle(_animationDurations.slide);
            });
        })();

        /******************** widget: sublist | init ********************/
        (function() {
            _resetSublists();
        })();

        /******************** widget: sublist | toggle ********************/
        (function() {
            _$body.on('click', _selectors.sublist_trigger, function(e) {
                e.preventDefault();

                _toggleSublist($(this));
            });

            function _toggleSublist($trigger) {
                var isSublistOn = $trigger.hasClass(_classes.trigger_on),
                    $listItemClosest = $trigger.closest(_selectors.list_item);

                if (isSublistOn) {
                    $listItemClosest.find(_selectors.sublist).slideUp(_animationDurations.slide);
                    $listItemClosest.find(_selectors.sublist_trigger).removeClass(_classes.trigger_on);
                } else {
                    $trigger.next(_selectors.sublist).slideDown(_animationDurations.slide);
                    $trigger.addClass(_classes.trigger_on);
                }
            }
        })();

        /******************** widget: fullscreen ********************/
        (function() {
            _$body.on('click', _selectors.fullscreen_trigger, function(e) {
                e.preventDefault();

                var $dropdown = $(this).closest(_selectors.dropdown),
                    $dropdownTrigger = $dropdown.find(_selectors.dropdown_trigger);

                _isElementExistent($dropdownTrigger) && $dropdown.hasClass('open') && $dropdownTrigger.dropdown('toggle');

                _launchFullscreen(document.documentElement);
            });
        })();

        /******************** widget: notifications ********************/
        (function() {
            var $notifications = $(_selectors.notifications);

            _$body.on('click', _selectors.clear_notifications_trigger, function() {
                var interval = 150,
                    index = 0,
                    $notification = $notifications.find('.ptn-list__list-item'),
                    notificationCount = $notification.length;

                $notification.each(function() {
                    var $notificationCurrent = $(this);

                    setTimeout(function() {
                        $notificationCurrent.addClass('animated fadeOutRightBig');
                    }, (index += 1) * interval);
                });

                setTimeout(function() {
                    $notification.remove().delay(interval).queue(function() {
                        $notifications.addClass(_classes.notifications_empty);
                    });
                }, notificationCount * interval);
            });
        })();
    });

    /******************** event: page load ********************/
    _$window.load(function() {
        /******************** widget: page loader ********************/
        var $pageLoader = $(_selectors.page_loader);

        if (_isElementExistent($pageLoader)) {
            window.setTimeout(function() {
                $pageLoader.fadeOut();
            }, _animationDurations.fade);
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
            axis: 'yx',
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
        var statusOld = localStorage.getItem(_localStorageKeys.status_aside),
            statusNew = statusOld === _statuses.on ? _statuses.off : _statuses.on,
            $asideTrigger = $(_selectors.aside_trigger),
            $aside = $(_selectors.aside);

        localStorage.setItem(_localStorageKeys.status_aside, statusNew);

        _$body.toggleClass(_classes.body_aside_on);
        $asideTrigger.toggleClass(_classes.trigger_on);
        $aside.toggleClass(_classes.widget_on);

        _resetSublists();
        _scrollTo($aside, 'top');
    }

    function _toggleAsideStatelessly(action) {
        var $asideTrigger = $(_selectors.aside_trigger),
            $aside = $(_selectors.aside);

        if (action === _actions.show) {
            _$body.addClass(_classes.body_aside_on);
            $asideTrigger.addClass(_classes.trigger_on);
            $aside.addClass(_classes.widget_on);
        } else if (action === _actions.hide) {
            _$body.removeClass(_classes.body_aside_on);
            $asideTrigger.removeClass(_classes.trigger_on);
            $aside.removeClass(_classes.widget_on);
        }

        _resetSublists();
        _scrollTo($aside, 'top');
    }

    function _launchFullscreen(element) {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    }

    function _resetSublists() {
        var $activeListItemAncestors = $(_selectors.list_item_active).parents();

        $(_selectors.sublist).slideUp(_animationDurations.slide);
        $(_selectors.sublist_trigger).removeClass(_classes.trigger_on);

        $activeListItemAncestors.each(function() {
            var $listItem = $(this);

            $listItem.children(_selectors.sublist).slideDown(_animationDurations.slide);
            $listItem.children(_selectors.sublist_trigger).addClass(_classes.trigger_on);
        });
    }
})(window);


































$(document).ready(function() {
    // Auto height textarea
    if ($('.auto-size')[0]) {
        autosize($('.auto-size'));
    }

    // Text field
    // Add blue animated border and remove with condition when focus and blur
    if ($('.fg-line')[0]) {
        $('body').on('focus', '.fg-line .form-control', function() {
            $(this).closest('.fg-line').addClass('fg-toggled');
        });

        $('body').on('blur', '.form-control', function() {
            var p = $(this).closest('.form-group, .input-group');
            var i = p.find('.form-control').val();

            if (p.hasClass('fg-float')) {
                if (i.length == 0) {
                    $(this).closest('.fg-line').removeClass('fg-toggled');
                }
            } else {
                $(this).closest('.fg-line').removeClass('fg-toggled');
            }
        });
    }

    // Add blue border for pre-valued fg-flot text fields
    if ($('.fg-float')[0]) {
        $('.fg-float .form-control').each(function() {
            var i = $(this).val();

            if (!i.length == 0) {
                $(this).closest('.fg-line').addClass('fg-toggled');
            }
        });
    }

    // Audio and video
    if ($('audio, video')[0]) {
        $('video, audio').mediaelementplayer();
    }

    // Tag select
    if ($('.chosen')[0]) {
        $('.chosen').chosen({
            width: '100%',
            allow_single_deselect: true
        });
    }

    // Input Slider
    if ($('.input-slider')[0]) {
        $('.input-slider').each(function() {
            var isStart = $(this).data('is-start');

            $(this).noUiSlider({
                start: isStart,
                range: {
                    'min': 0,
                    'max': 100
                }
            });
        });
    }

    // Range slider
    if ($('.input-slider-range')[0]) {
        $('.input-slider-range').noUiSlider({
            start: [30, 60],
            range: {
                'min': 0,
                'max': 100
            },
            connect: true
        });
    }

    // Range slider with value
    if ($('.input-slider-values')[0]) {
        $('.input-slider-values').noUiSlider({
            start: [45, 80],
            connect: true,
            direction: 'rtl',
            behaviour: 'tap-drag',
            range: {
                'min': 0,
                'max': 100
            }
        });

        $('.input-slider-values').Link('lower').to($('#value-lower'));
        $('.input-slider-values').Link('upper').to($('#value-upper'), 'html');
    }

    // Input mask
    if ($('input-mask')[0]) {
        $('.input-mask').mask();
    }

    // Color Picker
    if ($('.color-picker')[0]) {
        $('.color-picker').each(function() {
            var colorOutput = $(this).closest('.cp-container').find('.cp-value');
            $(this).farbtastic(colorOutput);
        });
    }

    // HTML Editor
    if ($('.html-editor')[0]) {
        $('.html-editor').summernote({
            height: 150
        });
    }

    if ($('.html-editor-click')[0]) {
        // Edit
        $('body').on('click', '.hec-button', function() {
            $('.html-editor-click').summernote({
                focus: true
            });
            $('.hec-save').show();
        });

        // Save
        $('body').on('click', '.hec-save', function() {
            $('.html-editor-click').code();
            $('.html-editor-click').destroy();
            $('.hec-save').hide();
            notify('Content Saved Successfully!', 'success');
        });
    }

    // Air mode
    if ($('.html-editor-airmod')[0]) {
        $('.html-editor-airmod').summernote({
            airMode: true
        });
    }

    // Date time picker
    if ($('.date-time-picker')[0]) {
        $('.date-time-picker').datetimepicker();
    }

    // Time
    if ($('.time-picker')[0]) {
        $('.time-picker').datetimepicker({
            format: 'LT'
        });
    }

    // Date
    if ($('.date-picker')[0]) {
        $('.date-picker').datetimepicker({
            format: 'DD/MM/YYYY'
        });
    }

    // Form
    if ($('.form-wizard-basic')[0]) {
        $('.form-wizard-basic').bootstrapWizard({
            tabClass: 'fw-nav',
            'nextSelector': '.next',
            'previousSelector': '.previous'
        });
    }

    // Bootstrap growl - Notifications popups
    function notify(message, type) {
        $.growl({
            message: message
        }, {
            type: type,
            allow_dismiss: false,
            label: 'Cancel',
            className: 'btn-xs btn-inverse',
            placement: {
                from: 'top',
                align: 'right'
            },
            delay: 2500,
            animate: {
                enter: 'animated bounceIn',
                exit: 'animated bounceOut'
            },
            offset: {
                x: 20,
                y: 85
            }
        });
    }

    // Waves animation
    (function() {
        Waves.attach('.btn:not(.btn-icon):not(.btn-float)');
        Waves.attach('.btn-icon, .btn-float', ['waves-circle', 'waves-float']);
        Waves.init();
    })();

    // Lightbox
    if ($('.lightbox')[0]) {
        $('.lightbox').lightGallery({
            enableTouch: true
        });
    }

    // Link prevent
    $('body').on('click', '.a-prevent', function(e) {
        e.preventDefault();
    });

    // Collapse fix
    if ($('.collapse')[0]) {
        // Add active class for opened items
        $('.collapse').on('show.bs.collapse', function(e) {
            $(this).closest('.panel').find('.panel-heading').addClass('active');
        });

        $('.collapse').on('hide.bs.collapse', function(e) {
            $(this).closest('.panel').find('.panel-heading').removeClass('active');
        });

        // Add active class for pre opened items
        $('.collapse.in').each(function() {
            $(this).closest('.panel').find('.panel-heading').addClass('active');
        });
    }

    // Tooltips
    if ($('[data-toggle="tooltip"]')[0]) {
        $('[data-toggle="tooltip"]').tooltip();
    }

    // Popover
    if ($('[data-toggle="popover"]')[0]) {
        $('[data-toggle="popover"]').popover();
    }

    // Login
    if ($('.login-content')[0]) {
        // Add class to HTML
        // This is used to center align the login box
        $('html').addClass('login-content');

        $('body').on('click', '.login-navigation > li', function() {
            var z = $(this).data('block');
            var t = $(this).closest('.lc-block');

            t.removeClass('toggled');

            setTimeout(function() {
                $(z).addClass('toggled');
            });
        })
    }

    // Profile edit toggle
    if ($('[data-pmb-action]')[0]) {
        $('body').on('click', '[data-pmb-action]', function(e) {
            e.preventDefault();
            var d = $(this).data('pmb-action');

            if (d === "edit") {
                $(this).closest('.pmb-block').toggleClass('toggled');
            }

            if (d === "reset") {
                $(this).closest('.pmb-block').removeClass('toggled');
            }
        });
    }

    // IE 9 placeholder
    if ($('html').hasClass('ie9')) {
        $('input, textarea').placeholder({
            customClass: 'ie9-placeholder'
        });
    }

    // Listview search
    if ($('.lvh-search-trigger')[0]) {
        $('body').on('click', '.lvh-search-trigger', function(e) {
            e.preventDefault();
            x = $(this).closest('.lv-header-alt').find('.lvh-search');

            x.fadeIn(300);
            x.find('.lvhs-input').focus();
        });

        // Close search
        $('body').on('click', '.lvh-search-close', function() {
            x.fadeOut(300);
            setTimeout(function() {
                x.find('.lvhs-input').val('');
            }, 350);
        })
    }


    // Print
    if ($('[data-action="print"]')[0]) {
        $('body').on('click', '[data-action="print"]', function(e) {
            e.preventDefault();

            window.print();
        })
    }

    // Typeahead auto complete
    if ($('.typeahead')[0]) {
        var statesArray = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
            'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii',
            'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
            'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
            'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
            'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
            'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
            'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
            'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
        ];
        var states = new Bloodhound({
            datumTokenizer: Bloodhound.tokenizers.whitespace,
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            local: statesArray
        });

        $('.typeahead').typeahead({
                hint: true,
                highlight: true,
                minLength: 1
            },
            {
                name: 'states',
                source: states
            });
    }

    // Wall
    if ($('.wcc-toggle')[0]) {
        var z = '<div class="wcc-inner">' +
            '<textarea class="wcci-text auto-size" placeholder="Write Something..."></textarea>' +
            '</div>' +
            '<div class="m-t-15">' +
            '<button class="btn btn-sm btn-primary">Post</button>' +
            '<button class="btn btn-sm btn-link wcc-cencel">Cancel</button>' +
            '</div>';

        $('body').on('click', '.wcc-toggle', function() {
            $(this).parent().html(z);
            // Reload Auto size textarea
            autosize($('.auto-size'));
        });

        // Cancel
        $('body').on('click', '.wcc-cencel', function(e) {
            e.preventDefault();

            $(this).closest('.wc-comment').find('.wcc-inner').addClass('wcc-toggle').html('Write Something...');
        });
    }
});
