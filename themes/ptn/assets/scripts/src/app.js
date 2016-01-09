'use strict';

(function(window) {
    /******************** private variables ********************/
    var _isDeviceMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
        _animationDurations = {
            fade: 500,
            slide: 200
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
            var _$aside = $('#aside');

            if (_isDeviceMobile) {
                return;
            }

            _addScrollBar(_$aside, 'minimal-dark', 'y');

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
        })();

        /******************** widget: dropdown ********************/
        (function() {
            var _selectorDropdownMenuActive = '.ptn-dropdown.open .ptn-dropdown__menu',
                _$dropdown = $('.ptn-dropdown');

            if (!_isElementExistent(_$dropdown)) {
                return;
            }

            _$body.on('click', _selectorDropdownMenuActive, function(e) {
                e.stopPropagation();
            });
        })();

        /******************** widget: search ********************/
        (function() {
            var _selectorSearchTrigger = '#search-trigger',
                _selectorSearchButton = '#search-button',
                _$search = $('#search'),
                _$searchInput = $('#search-input input');

            _$body
                .on('click', _selectorSearchTrigger, function() {
                    _$search.addClass(_classes.widget_on);
                    _$searchInput.focus();
                })
                .on('click', _selectorSearchButton, function() {
                    _$search.removeClass(_classes.widget_on);
                });
        })();

        /******************** widget: aside ********************/
        (function() {
            var _asideStatuses = {
                    on: 'on',
                    off: 'off'
                },
                _localStorageKeyAsideStatus = 'ptn-status-aside',
                _asideStatus = localStorage.getItem(_localStorageKeyAsideStatus),
                _selectorAsideTrigger = '#aside-trigger',
                _$asideTrigger = $(_selectorAsideTrigger),
                _$aside = $('#aside');

            if (_asideStatus === _asideStatuses.on) {
                _$body.addClass(_classes.body_aside_on);
                _$asideTrigger.addClass(_classes.trigger_on);
                _$aside.addClass(_classes.widget_on);
            }

            _$body.on('click', _selectorAsideTrigger, function(e) {
                e.preventDefault();

                _toggleAside();

                //// Close opened sub-menus
                //$('.sub-menu.toggled').not('.active').each(function() {
                //    $(this).removeClass('toggled');
                //    $(this).find('ul').hide();
                //});
                //
                //
                //$('.profile-menu .main-menu').hide();
            });

            function _toggleAside() {
                var _statusOld = localStorage.getItem(_localStorageKeyAsideStatus),
                    _statusNew = _statusOld === _asideStatuses.on ? _asideStatuses.off : _asideStatuses.on;

                localStorage.setItem(_localStorageKeyAsideStatus, _statusNew);

                _$body.toggleClass(_classes.body_aside_on);
                _$asideTrigger.toggleClass(_classes.trigger_on);
                _$aside.toggleClass(_classes.widget_on);
            }
        })();

        /******************** widget: aside account ********************/
        (function() {
            var _selectorAccountMenuTrigger = '#account-menu-trigger',
                _$accountMenu = $('#account-menu');

            _$body.on('click', _selectorAccountMenuTrigger, function() {
                $(this).toggleClass(_classes.trigger_on);
                _$accountMenu.slideToggle(_animationDurations.slide);
            });
        })();

        /******************** widget: sublist ********************/
        (function() {
            var _selectorSublistTrigger = '.ptn-list__list-item-link_sublist',
                _selectorSublist = '.ptn-list__list-item-sublist';

            _$body.on('click', _selectorSublistTrigger, function(e) {
                e.preventDefault();

                $(this).next(_selectorSublist).slideToggle(_animationDurations.slide);
                $(this).toggleClass(_classes.trigger_on);
            });
        })();

        /******************** widget: fullscreen ********************/
        (function() {
            var _documentElement = document.documentElement,
                _$fullscreenTrigger = $('[data-ptn-action="fullscreen"]');

            if (!_isElementExistent(_$fullscreenTrigger)) {
                return;
            }

            _$fullscreenTrigger.on('click', function(e) {
                e.preventDefault();

                var _$dropdown = $(this).closest('.ptn-dropdown'),
                    _$dropdownTrigger = _$dropdown.find('.ptn-dropdown__trigger');

                _isElementExistent(_$dropdownTrigger) && _$dropdown.hasClass('open') && _$dropdownTrigger.dropdown('toggle');

                _launchFullscreen(_documentElement);
            });
        })();

        /******************** widget: notifications ********************/
        (function() {
            var _selectorClearNotifications = '[data-ptn-action="clear-notifications"]',
                _$notifications = $('#notifications');

            _$body.on('click', _selectorClearNotifications, function() {
                var _interval = 150,
                    _index = 0,
                    _$notification = _$notifications.find('.ptn-list__list-item'),
                    _notificationCount = _$notification.length;

                _$notification.each(function() {
                    var _$notificationCurrent = $(this);

                    setTimeout(function() {
                        _$notificationCurrent.addClass('animated fadeOutRightBig');
                    }, (_index += 1) * _interval);
                });

                setTimeout(function() {
                    _$notification.remove().delay(_interval).queue(function() {
                        _$notifications.addClass(_classes.notifications_empty);
                    });
                }, _notificationCount * _interval);
            });
        })();
    });

    /******************** event: page load ********************/
    _$window.load(function() {
        /******************** widget: page loader ********************/
        var _$pageLoader = $('#page-loader');

        if (!_isDeviceMobile && _isElementExistent(_$pageLoader)) {
            window.setTimeout(function() {
                _$pageLoader.fadeOut();
            }, _animationDurations.fade);
        }
    });

    /******************** private functions ********************/
    function _isElementExistent($element) {
        return !!$element.length;
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
