/**
 * @description Dependancy injection function
 * @param  {String}     File    Name of the dependancy
 * @param  {String}     Type    Dependancy type
 * @return {Null}
 */
$.required = function(file, filetype) {
    var markup = 'undefined';

    if (filetype == 'js') { //if filename is a external JavaScript file
        markup = document.createElement('script');
        markup.setAttribute("type", "text/javascript");
        markup.setAttribute("src", file);
    } else if (filetype == 'css') { //if filename is an external CSS file
        markup = document.createElement('link');
        markup.setAttribute("rel", "stylesheet");
        markup.setAttribute("type", "text/css");
        markup.setAttribute("href", file);
    }

    if (typeof markup != 'undefined') {
        if (filetype == 'js') {
            $('html script[src*="theme-wso2.js"]').before(markup);
        } else if (filetype == 'css') {
            $('head link[href*="main.less"]').before(markup);
        }
    }
};

/**
 * @description Attribute toggle function
 * @param  {String} attr    Attribute Name
 * @param  {String} val     Value to be matched
 * @param  {String} val2    Value to be replaced with
 */
$.fn.toggleAttr = function(attr, val, val2) {
    return this.each(function() {
        var self = $(this);
        if (self.attr(attr) == val)
            self.attr(attr, val2);
        else
            self.attr(attr, val);
    });
};


/**
 * A function to add data attributes to HTML about the user agent
 * @return {Null}
 */
$.browser_meta = function() {
    $('html')
        .attr('data-useragent', navigator.userAgent)
        .attr('data-platform', navigator.platform)
        .addClass(((!!('ontouchstart' in window) || !!('onmsgesturechange' in window)) ? ' touch' : ''));
};


/**
 * Cross browser file input controller
 * @return {Node} DOM Node
 */
$.file_input = function() {
    var elem = '.file-upload-control';

    return $(elem).each(function() {

        //Input value change function
        $(elem + ' :file').change(function() {
            var input = $(this),
                numFiles = input.get(0).files ? input.get(0).files.length : 1,
                label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
            input.trigger('fileselect', [numFiles, label]);
        });

        //Button click function
        $(elem + ' .browse').click(function() {
            $(this).parents('.input-group').find(':file').click();
        });

        //File select function
        $(elem + ' :file').on('fileselect', function(event, numFiles, label) {
            var input = $(this).parents('.input-group').find(':text'),
                log = numFiles > 1 ? numFiles + ' files selected' : label;

            if (input.length) {
                input.val(log);
            } else {
                if (log) {
                    alert(log);
                }
            }
        });

    });
};

/**
 * @description Auto resize icons and text on browser resize
 * @param  {Number}     Compression Ratio
 * @param  {Object}     Object containing the values to override defaults
 * @return {Node}       DOM Node
 */
$.fn.responsive_text = function(compress, options) {

    // Setup options
    var compressor = compress || 1,
        settings = $.extend({
            'minFontSize': Number.NEGATIVE_INFINITY,
            'maxFontSize': Number.POSITIVE_INFINITY
        }, options);

    return this.each(function() {

        //Cache object for performance
        var $this = $(this);

        //resize items based on the object width devided by the compressor
        var resizer = function() {
            $this.css('font-size', Math.max(Math.min($this.width() / (compressor * 10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
        };

        //Init method
        resizer();

        //event bound to browser window to fire on window resize
        $(window).on('resize.fittext orientationchange.fittext', resizer);

    });

};

/**
 * @description Random background color generator for thumbs
 * @param  {range}      Color Range Value
 * @return {Node}       DOM Node
 */
$.fn.random_background_color = function(range) {

    if (!range) {
        range = 9;
    }

    return this.each(function() {

        var color = '#' + Math.random().toString(range).substr(-6);
        $(this).css('background', color);

    });

};

/**
 * Data tables extended functionality wrapper
 * @param  {Object} settings Settings to override the defaults data tables behaviour
 * @return {Null}
 */
$.fn.datatables_extended = function(settings) {

    if(typeof $.fn.DataTable != 'function'){
        console.warn('Warning : Dependency missing - DataTable Library');
    }
    else {
        var elem = $(this);

        $(elem).DataTable(
            $.extend({}, {
                bSortCellsTop: true,
                responsive: false,
                autoWidth: false,
                dom: '<"dataTablesTop"' +
                'f' +
                '<"dataTables_toolbar">' +
                '>' +
                'rt' +
                '<"dataTablesBottom"' +
                'lip' +
                '>',
                language: {
                    searchPlaceholder: 'Filter by ...',
                    search: ''
                },
                initComplete: function () {

                    var ROW_SELECTED_CLASS = 'DTTT_selected';

                    this.api().columns().every(function () {

                        var column = this;
                        var filterColumn = $('.filter-row th', elem);

                        //Create & add select/text filters to each column
                        if (filterColumn.eq(column.index()).hasClass('select-filter')) {
                            var select = $('<select class="form-control"><option value="">All</option></select>')
                                .appendTo(filterColumn.eq(column.index()).empty())
                                .on('change', function () {
                                    var val = $.fn.dataTable.util.escapeRegex(
                                        $(this).val()
                                    );

                                    column
                                        .search(val ? '^' + val + '$' : '', true, false)
                                        .draw();
                                });

                            $(column).each(function () {
                                if ($(column.nodes()).attr('data-search')) {
                                    var titles = [];
                                    column.nodes().unique().sort().each(function (d, j) {
                                        var title = $(d).attr('data-display');
                                        if ($.inArray(title, titles) < 0) {
                                            titles.push(title);
                                            if (title !== undefined) {
                                                select.append('<option value="' + title + '">' + title + '</option>')
                                            }
                                        }
                                    });
                                } else {
                                    column.data().unique().sort().each(function (d, j) {
                                        select.append('<option value="' + d + '">' + d + '</option>')
                                    });
                                }
                            });
                        } else if (filterColumn.eq(column.index()).hasClass('text-filter')) {
                            var title = filterColumn.eq(column.index()).attr('data-for');
                            $(filterColumn.eq(column.index()).empty()).html('<input type="text" class="form-control" placeholder="Search for ' + title + '" />');

                            filterColumn.eq(column.index()).find('input').on('keyup change', function () {
                                column
                                    .search($(this).val())
                                    .draw();
                            });
                        }

                    });

                    //Search input default styles override
                    var search_input = $(this).closest('.dataTables_wrapper').find('div[id$=_filter] input');
                    search_input.before('<i class="fw fw-search search-icon"></i>').removeClass('input-sm');

                    // Create sorting dropdown menu for list table advance operations
                    var dropdownmenu = $('<ul class="dropdown-menu arrow arrow-top-right dark sort-list add-margin-top-2x"><li class="dropdown-header">Sort by</li></ul>');
                    $('.sort-row th', elem).each(function () {
                        if (!$(this).hasClass('no-sort')) {
                            dropdownmenu.append('<li><a href="#' + $(this).html() + '" data-column="' + $(this).index() + '">' + $(this).html() + '</a></li>');
                        }
                    });

                    //Append advance operations to list table toolbar
                    $('.dataTable.list-table').closest('.dataTables_wrapper').find('.dataTablesTop .dataTables_toolbar').html('' +
                        '<ul class="nav nav-pills navbar-right remove-margin" role="tablist">' +
                        '<li><button data-click-event="toggle-select" class="btn btn-default btn-primary">Select</li>' +
                        '<li class="select-all-btn" style="display:none;"><button data-click-event="toggle-select-all" class="btn btn-default btn-primary">Select All</li>' +
                        '<li><button data-click-event="toggle-list-view" data-view="grid" class="btn btn-default"><i class="fw fw-grid"></i></button></li>' +
                        '<li><button data-click-event="toggle-list-view" data-view="list" class="btn btn-default"><i class="fw fw-list"></i></button></li>' +
                        '<li><button class="btn btn-default" data-toggle="dropdown"><i class="fw fw-sort"></i></button>' + dropdownmenu[0].outerHTML + '</li>' +
                        '</ul>'
                    );

                    //Sorting dropdown menu select function
                    $('.dataTables_wrapper .sort-list li a').click(function () {
                        $(this).closest('li').siblings('li').find('a').removeClass('sorting_asc').removeClass('sorting_desc');

                        var thisTable = $(this).closest('.dataTables_wrapper').find('.dataTable').dataTable();

                        if (!($(this).hasClass('sorting_asc')) && !($(this).hasClass('sorting_desc'))) {
                            $(this).addClass('sorting_asc');
                            thisTable.fnSort([
                                [$(this).attr('data-column'), 'asc']
                            ]);
                        } else if ($(this).hasClass('sorting_asc')) {
                            $(this).switchClass('sorting_asc', 'sorting_desc');
                            thisTable.fnSort([
                                [$(this).attr('data-column'), 'desc']
                            ]);
                        } else if ($(this).hasClass('sorting_desc')) {
                            $(this).switchClass('sorting_desc', 'sorting_asc');
                            thisTable.fnSort([
                                [$(this).attr('data-column'), 'asc']
                            ]);
                        }
                    });

                    //Enable/Disable selection on rows
                    $('.dataTables_wrapper').off('click', '[data-click-event=toggle-select]');
                    $('.dataTables_wrapper').on('click', '[data-click-event=toggle-select]', function () {
                        var button = this,
                            thisTable = $(this).closest('.dataTables_wrapper').find('.dataTable').dataTable();
                        if ($(button).html() == 'Select') {
                            thisTable.api().rows().every(function () {
                                $(this.node()).attr('data-type','selectable');
                            });
                            thisTable.addClass("table-selectable");
                            $(button).addClass("active").html('Cancel');
                            $(button).closest('li').siblings('.select-all-btn').show();
                        } else if ($(button).html() == 'Cancel'){
                            thisTable.api().rows().every(function () {
                                $(this.node()).removeAttr('data-type');
                                $(this.node()).removeClass(ROW_SELECTED_CLASS);
                            });
                            thisTable.removeClass("table-selectable");
                            $(button).removeClass("active").html('Select');
                            $(button).closest('li').siblings('.select-all-btn').hide();
                        }
                    });

                    //Select/Deselect all rows functions
                    $('.dataTables_wrapper').off('click', '[data-click-event=toggle-select-all]');
                    $('.dataTables_wrapper').on('click', '[data-click-event=toggle-select-all]', function () {
                        var button = this,
                            thisTable = $(this).closest('.dataTables_wrapper').find('.dataTable').dataTable();
                        if ($(button).html() == 'Select All') {
                            thisTable.api().rows().every(function () {
                                $(this.node()).addClass(ROW_SELECTED_CLASS);
                                $(button).html('Deselect All');
                            });
                        } else if ($(button).html() == 'Deselect All') {
                            thisTable.api().rows().every(function () {
                                $(this.node()).removeClass(ROW_SELECTED_CLASS);
                                $(button).html('Select All');
                            });
                        }
                    });


                    //Event for row select/deselect
                    $('body').on('click', '[data-type=selectable]', function() {
                        $(this).toggleClass(ROW_SELECTED_CLASS);
                        var button = this,
                            thisTable = $(this).closest('.dataTables_wrapper').find('.dataTable').dataTable();

                        thisTable.api().rows().every(function () {
                            if (!$(this.node()).hasClass(ROW_SELECTED_CLASS)) {
                                $(button).closest('.dataTables_wrapper').find('[data-click-event=toggle-selected]').html('Select All');
                            }
                        });
                    });

                    //list table list/grid view toggle function
                    var toggleButton = $('[data-click-event=toggle-list-view]');
                    toggleButton.click(function () {
                        if ($(this).attr('data-view') == 'grid') {
                            $(this).closest('.dataTables_wrapper').find('.dataTable').addClass('grid-view');
                            //$(this).closest('li').hide();
                            //$(this).closest('li').siblings().show();
                        } else {
                            $(this).closest('.dataTables_wrapper').find('.dataTable').removeClass('grid-view');
                            //$(this).closest('li').hide();
                            //$(this).closest('li').siblings().show();
                        }
                    });

                    //delete selected rows
                    $('[data-click-event=delete-selected-rows]').click(function () {
                        var thisTable = $(this).closest('.dataTables_wrapper').find('.dataTable').dataTable();
                        thisTable.api().rows('.' + ROW_SELECTED_CLASS).remove().draw(false);
                    });

                    $('.random-thumbs .thumbnail.icon').random_background_color();

                }
            }, settings)
        );
    }

};


/**
 * Tree view function
 * @return {Null}
 */
$.fn.tree_view = function() {
    var tree = $(this);
    tree.find('li').has("ul").each(function() {
        var branch = $(this); //li with children ul
        branch.prepend('<i class="icon"></i>');
        branch.addClass('branch');
        branch.on('click', function(e) {
            if (this == e.target) {
                var icon = $(this).children('i:first');
                icon.closest('li').toggleAttr('aria-expanded', 'true', 'false');
            }
        });
    });

    tree.find('.branch .icon').each(function() {
        $(this).on('click', function() {
            $(this).closest('li').click();
        });
    });

    tree.find('.branch > a').each(function() {
        $(this).on('click', function(e) {
            $(this).closest('li').click();
            e.preventDefault();
        });
    });

    tree.find('.branch > button').each(function() {
        $(this).on('click', function(e) {
            $(this).closest('li').click();
            e.preventDefault();
        });
    });
};


/**
 * Sidebar function
 * @return {Null}
 */
$.sidebar_toggle = function(action, target, container) {
    var elem = '[data-toggle=sidebar]',
        button,
        container,
        conrainerOffsetLeft,
        conrainerOffsetRight,
        target,
        targetOffsetLeft,
        targetOffsetRight,
        targetWidth,
        targetSide,
        relationship,
        pushType,
        buttonParent;

    var sidebar_window = {
        update: function(target, container, button){
            conrainerOffsetLeft = $(container).data('offset-left') ? $(container).data('offset-left') : 0,
            conrainerOffsetRight = $(container).data('offset-right') ? $(container).data('offset-right') : 0,
            targetOffsetLeft = $(target).data('offset-left') ? $(target).data('offset-left') : 0,
            targetOffsetRight = $(target).data('offset-right') ? $(target).data('offset-right') : 0,
            targetWidth = $(target).data('width'),
            targetSide = $(target).data("side"),
            pushType = $(container).parent().is('body') == true ? 'padding' : 'margin';

            if(button !== undefined){
                relationship = button.attr('rel') ? button.attr('rel') : '';
                buttonParent = $(button).parent();
            }
        },
        show: function(){

            if($(target).data('sidebar-fixed') == true) {
                $(target).height($(window).height() - $(target).data('fixed-offset'));
            }

            $(target).trigger('show.sidebar');
            if(targetWidth !== undefined) {
                $(target).css('width', targetWidth);
            }
            $(target).addClass('toggled');

            if(button !== undefined){
                if(relationship !== ''){
                    // Removing active class from all relative buttons
                    $(elem+'[rel='+relationship+']:not([data-handle=close])').removeClass("active");
                    $(elem+'[rel='+relationship+']:not([data-handle=close])').attr('aria-expanded', 'false');
                }

                // Adding active class to button
                if(button.attr('data-handle') !== 'close'){
                    button.addClass("active");
                    button.attr('aria-expanded', 'true');
                }

                if(buttonParent.is('li')) {
                    if(relationship !== ''){
                        $(elem+'[rel='+relationship+']:not([data-handle=close])').parent().removeClass("active");
                        $(elem+'[rel='+relationship+']:not([data-handle=close])').parent().attr('aria-expanded', 'false');
                    }
                    buttonParent.addClass("active");
                    buttonParent.attr('aria-expanded', 'true');
                }
            }

            // Sidebar open function
            if (targetSide == 'left'){
                if((button !== undefined) && (button.attr('data-container-divide'))){
                    $(container).css(pushType+'-'+targetSide, targetWidth + targetOffsetLeft);
                }
                $(target).css(targetSide, targetOffsetLeft);
            }
            else if (targetSide == 'right'){
                if((button !== undefined) && (button.attr('data-container-divide'))){
                    $(container).css(pushType+'-'+targetSide, targetWidth + targetOffsetRight);
                }
                $(target).css(targetSide, targetOffsetRight);
            }

            $(target).trigger('shown.sidebar');
        },
        hide: function(){

            $(target).trigger('hide.sidebar');
            $(target).removeClass('toggled');

            if(button !== undefined){
                if(relationship !== ''){
                    // Removing active class from all relative buttons
                    $(elem+'[rel='+relationship+']:not([data-handle=close])').removeClass("active");
                    $(elem+'[rel='+relationship+']:not([data-handle=close])').attr('aria-expanded', 'false');
                }
                // Removing active class from button
                if(button.attr('data-handle') !== 'close'){
                    button.removeClass("active");
                    button.attr('aria-expanded', 'false');
                }

                if($(button).parent().is('li')){
                    if(relationship !== ''){
                        $(elem+'[rel='+relationship+']:not([data-handle=close])').parent().removeClass("active");
                        $(elem+'[rel='+relationship+']:not([data-handle=close])').parent().attr('aria-expanded', 'false');
                    }
                }
            }

            // Sidebar close function
            if (targetSide == 'left'){
                if((button !== undefined) && (button.attr('data-container-divide'))){
                    $(container).css(pushType+'-'+targetSide, targetOffsetLeft);
                }
                $(target).css(targetSide, -Math.abs(targetWidth + targetOffsetLeft));
            }
            else if (targetSide == 'right'){
                if((button !== undefined) && (button.attr('data-container-divide'))){
                    $(container).css(pushType+'-'+targetSide, targetOffsetRight);
                }
                $(target).css(targetSide, -Math.abs(targetWidth + targetOffsetRight));
            }

            $(target).trigger('hidden.sidebar');
        }
    };

    if (action === 'show') {
        sidebar_window.update(target, container);
        sidebar_window.show();
    }
    if (action === 'hide') {
        sidebar_window.update(target, container);
        sidebar_window.hide();
    }

    // binding click function
    $('body').off('click', elem);
    $('body').on('click', elem, function(e) {
        e.preventDefault();

        button = $(this);
        container = button.data('container');
        target = button.data('target');

        sidebar_window.update(target, container, button);

        /**
         * Sidebar function on data container divide
         * @return {Null}
         */
        if(button.attr('aria-expanded') == 'false'){
            sidebar_window.show();
        }
        else if (button.attr('aria-expanded') == 'true') {
            sidebar_window.hide();
        }

    });
};
//$.sidebar_toggle = function() {
//    var elem = '[data-toggle=sidebar]';
//
//    return $(elem).each(function() {
//        $(elem).click(function(e) {
//            e.preventDefault();
//
//            var container = $(this).attr('data-container'),
//                target = $(this).attr('data-target');
//
//            $(this).toggleAttr('aria-expanded', 'true', 'false');
//            $(this).closest('li').toggleClass("active");
//
//            if ($(this).attr('data-container-push')) {
//                $(container)
//                    .toggleAttr('data-container-push', 'true', 'false')
//                    .attr('data-push-side', $(this).attr('data-push-side'));
//            } else if ($(this).attr('data-container-divide')) {
//                $(container)
//                    .toggleAttr('data-container-divide', 'true', 'false')
//                    .attr('data-divide-side', $(this).attr('data-divide-side'));
//            }
//
//            $(target)
//                .toggleClass("toggled")
//                .attr('data-side', $(this).attr('data-side'));
//        });
//    });
//};
/**
 * collapse nav sub-level function
 * @return {Null}
 */
$.fn.collapse_nav_sub = function(){

    var navSelector = 'ul.nav';

    if(!$(navSelector).hasClass('collapse-nav-sub')) {
        $(navSelector + ' > li', this).each(function () {
            var position = $(this).offset().left - $(this).parent().scrollLeft();
            $(this).attr('data-absolute-position', (position + 5));
        });

        $(navSelector + ' li', this).each(function () {
            if ($('ul', this).length !== 0) {
                $(this).addClass('has-sub');
            }
        });

        $(navSelector + ' > li', this).each(function () {
            $(this).css({
                'left': $(this).data('absolute-position'),
                'position': 'absolute'
            });
        });

        $(navSelector + ' li.has-sub', this).on('click', function () {
            var elem = $(this);
            if (elem.attr('aria-expanded') !== 'true') {
                elem.siblings().fadeOut(100, function () {
                    elem.animate({'left': '15'}, 200, function () {
                        $(elem).first().children('ul').fadeIn(200);
                    });
                });
                elem.siblings().attr('aria-expanded', 'false');
                elem.attr('aria-expanded', 'true');
            }
            else {
                $(elem).first().children('ul').fadeOut(100, function () {
                    elem.animate({'left': $(elem).data('absolute-position')}, 200, function () {
                        elem.siblings().fadeIn(100);
                    });
                });
                elem.siblings().attr('aria-expanded', 'false');
                elem.attr('aria-expanded', 'false');
            }
        });

        $(navSelector + ' > li.has-sub ul', this).on('click', function (e) {
            e.stopPropagation();
        });

        $(navSelector).addClass('collapse-nav-sub');
    }
};