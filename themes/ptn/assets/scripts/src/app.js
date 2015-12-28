(function(window) {
    /******************** private variables ********************/
    var _isDeviceMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
        _$window = $(window),
        _$html = $('html'),
        _$body = $('body');

    /******************** mobile device class ********************/
    if (_isDeviceMobile) {
        _$html.addClass('ptn-html_device-mobile');
    }

    /******************** event: DOM ready ********************/
    $(function() {
        /******************** private variables ********************/
        var _sidebarStatuses = {
                closed: 'closed',
                open: 'open'
            },
            _sidebarStatusLocalStorageKey = 'ptn-status-layout',
            _sidebarStatus = localStorage.getItem(_sidebarStatusLocalStorageKey),
            _sidebarTriggerSelector = '#sidebar-trigger',
            _$sidebarTrigger = $(_sidebarTriggerSelector),
            _$sidebar = $('#sidebar');

        /******************** widget: scrollbar ********************/
        if (!_isDeviceMobile) {
            _addScrollBar(_$sidebar, 'minimal-dark', 'y');
        }

        /******************** layout: sidebar ********************/
        if (_sidebarStatus === _sidebarStatuses.open) {
            _$body.addClass('ptn-body_sidebar-open');
            _$sidebar.addClass('toggled');
            _$sidebarTrigger.addClass('open');
        }

        _$body.on('click', _sidebarTriggerSelector, function(e) {
            e.preventDefault();

            _toggleSidebar();

            // Close opened sub-menus
            $('.sub-menu.toggled').not('.active').each(function() {
                $(this).removeClass('toggled');
                $(this).find('ul').hide();
            });


            $('.profile-menu .main-menu').hide();
        });

        // Submenu
        _$body.on('click', '.sub-menu > a', function(e) {
            e.preventDefault();
            $(this).next().slideToggle(200);
            $(this).parent().toggleClass('toggled');
        });

        /******************** private functions ********************/
        function _toggleSidebar() {
            var _status = localStorage.getItem(_sidebarStatusLocalStorageKey),
                _statusNew = _status === _sidebarStatuses.open ? _sidebarStatuses.closed : _sidebarStatuses.open;

            localStorage.setItem(_sidebarStatusLocalStorageKey, _statusNew);

            _$body.toggleClass('ptn-body_sidebar-open');
            _$sidebar.toggleClass('toggled');
            _$sidebarTrigger.toggleClass('open');
        }
    });

    /******************** event: page load ********************/
    _$window.load(function() {
        /******************** widget: page loader ********************/
        var _$pageLoader = $('#page-loader');

        if (!_isDeviceMobile && _isElementExistent(_$pageLoader)) {
            window.setTimeout(function() {
                //_$pageLoader.fadeOut();
            }, 500);
        }
    });

    /******************** private functions ********************/
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

    function _isElementExistent($element) {
        return !!$element.length;
    }
})(window);






$(document).ready(function() {
    // Search
    (function() {
        $('body').on('click', '#search-trigger > a', function(e) {
            e.preventDefault();

            $('#header').addClass('search-toggled');
            $('#search-ctn input').focus();
        });

        $('body').on('click', '#search-btn', function(e) {
            e.preventDefault();

            $('#header').removeClass('search-toggled');
        });
    })();

    // Clear notification
    $('body').on('click', '[data-clear="notification"]', function(e) {
        e.preventDefault();

        var x = $(this).closest('.listview');
        var y = x.find('.lv-item');
        var z = y.size();

        $(this).parent().fadeOut();

        x.find('.list-group').prepend('<i class="grid-loading hide-it"></i>');
        x.find('.grid-loading').fadeIn(1500);


        var w = 0;
        y.each(function() {
            var z = $(this);
            setTimeout(function() {
                z.addClass('animated fadeOutRightBig').delay(1000).queue(function() {
                    z.remove();
                });
            }, w += 150);
        });

        // Popup empty message
        setTimeout(function() {
            $('#notifications').addClass('empty');
        }, (z * 150) + 200);
    });

    //Dropdown menu
    if ($('.dropdown')[0]) {
        // Propagate
        $('body').on('click', '.dropdown.open .dropdown-menu', function(e) {
            e.stopPropagation();
        });

        $('.dropdown').on('shown.bs.dropdown', function(e) {
            if ($(this).attr('data-animation')) {
                $animArray = [];
                $animation = $(this).data('animation');
                $animArray = $animation.split(',');
                $animationIn = 'animated ' + $animArray[0];
                $animationOut = 'animated ' + $animArray[1];
                $animationDuration = ''
                if (!$animArray[2]) {
                    $animationDuration = 500; //if duration is not defined, default is set to 500ms
                } else {
                    $animationDuration = $animArray[2];
                }

                $(this).find('.dropdown-menu').removeClass($animationOut)
                $(this).find('.dropdown-menu').addClass($animationIn);
            }
        });

        $('.dropdown').on('hide.bs.dropdown', function(e) {
            if ($(this).attr('data-animation')) {
                e.preventDefault();
                $this = $(this);
                $dropdownMenu = $this.find('.dropdown-menu');

                $dropdownMenu.addClass($animationOut);
                setTimeout(function() {
                    $this.removeClass('open')

                }, $animationDuration);
            }
        });
    }

    // Auto height textarea
    if ($('.auto-size')[0]) {
        autosize($('.auto-size'));
    }

    // Profile menu
    $('body').on('click', '.profile-menu > a', function(e) {
        e.preventDefault();
        $(this).parent().toggleClass('toggled');
        $(this).next().slideToggle(200);
    });

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

    // Fullscreen browsing
    if ($('[data-action="fullscreen"]')[0]) {
        var fs = $("[data-action='fullscreen']");
        fs.on('click', function(e) {
            e.preventDefault();

            // Launch
            function launchIntoFullscreen(element) {

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

            // Exit
            function exitFullscreen() {

                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                }
            }

            launchIntoFullscreen(document.documentElement);
            fs.closest('.dropdown').removeClass('open');
        });
    }

    // Clear local storage
    if ($('[data-action="clear-localstorage"]')[0]) {
        var cls = $('[data-action="clear-localstorage"]');

        cls.on('click', function(e) {
            e.preventDefault();

            swal({
                title: 'Are you sure?',
                text: 'All your saved localStorage values will be removed',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: 'Yes, delete it!',
                closeOnConfirm: false
            }, function() {
                localStorage.clear();
                swal('Done!', 'localStorage is cleared', 'success');
            });
        });
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
