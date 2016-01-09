/*
 ~   Copyright (c) WSO2 Inc. (http://wso2.com) All Rights Reserved.
 ~
 ~   Licensed under the Apache License, Version 2.0 (the "License");
 ~   you may not use this file except in compliance with the License.
 ~   You may obtain a copy of the License at
 ~
 ~        http://www.apache.org/licenses/LICENSE-2.0
 ~
 ~   Unless required by applicable law or agreed to in writing, software
 ~   distributed under the License is distributed on an "AS IS" BASIS,
 ~   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 ~   See the License for the specific language governing permissions and
 ~   limitations under the License.
 */

/**
 * @description Check jQuery
 * @throw  {String}  throw an exception message if jquery is not loaded
 */
if (typeof(jQuery) === 'undefined') {
    throw 'jQuery is required.';
}

var responsiveTextRatio = 0.2,
    responsiveTextSleector = ".icon .text";

(function($) {

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
            console.warn('Warning : Dependency missing - tooltip Library');
        }

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
                initComplete: function() {

                    var ROW_SELECTED_CLASS = 'DTTT_selected';

                    this.api().columns().every(function() {

                        var column = this;
                        var filterColumn = $('.filter-row th', elem);

                        //Create & add select/text filters to each column
                        if (filterColumn.eq(column.index()).hasClass('select-filter')) {
                            var select = $('<select class="form-control"><option value="">All</option></select>')
                                .appendTo(filterColumn.eq(column.index()).empty())
                                .on('change', function() {
                                    var val = $.fn.dataTable.util.escapeRegex(
                                        $(this).val()
                                    );

                                    column
                                        .search(val ? '^' + val + '$' : '', true, false)
                                        .draw();
                                });

                            $(column).each(function() {
                                if ($(column.nodes()).attr('data-search')) {
                                    var titles = [];
                                    column.nodes().unique().sort().each(function(d, j) {
                                        var title = $(d).attr('data-display');
                                        if ($.inArray(title, titles) < 0) {
                                            titles.push(title);
                                            if (title !== undefined) {
                                                select.append('<option value="' + title + '">' + title + '</option>')
                                            }
                                        }
                                    });
                                } else {
                                    column.data().unique().sort().each(function(d, j) {
                                        select.append('<option value="' + d + '">' + d + '</option>')
                                    });
                                }
                            });
                        } else if (filterColumn.eq(column.index()).hasClass('text-filter')) {
                            var title = filterColumn.eq(column.index()).attr('data-for');
                            $(filterColumn.eq(column.index()).empty()).html('<input type="text" class="form-control" placeholder="Search for ' + title + '" />');

                            filterColumn.eq(column.index()).find('input').on('keyup change', function() {
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
                    $('.sort-row th', elem).each(function() {
                        if (!$(this).hasClass('no-sort')) {
                            dropdownmenu.append('<li><a href="#' + $(this).html() + '" data-column="' + $(this).index() + '">' + $(this).html() + '</a></li>');
                        }
                    });

                    //Append advance operations to list table toolbar
                    $('.dataTable.list-table').closest('.dataTables_wrapper').find('.dataTablesTop .dataTables_toolbar').html('' +
                        '<ul class="nav nav-pills navbar-right remove-margin" role="tablist">' +
                        '<li><button data-click-event="toggle-selected" class="btn btn-default btn-primary">Select All</li>' +
                        '<li><button data-click-event="toggle-list-view" data-view="grid" class="btn btn-default"><i class="fw fw-grid"></i></button></li>' +
                        '<li><button data-click-event="toggle-list-view" data-view="list" class="btn btn-default"><i class="fw fw-list"></i></button></li>' +
                        '<li><button class="btn btn-default" data-toggle="dropdown"><i class="fw fw-sort"></i></button>' + dropdownmenu[0].outerHTML + '</li>' +
                        '</ul>'
                    );

                    //Sorting dropdown menu select function
                    $('.dataTables_wrapper .sort-list li a').click(function() {
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

                    //Select/Deselect all rows functions
                    $('.dataTables_wrapper [data-click-event=toggle-selected]').click(function() {
                        var button = this,
                            thisTable = $(this).closest('.dataTables_wrapper').find('.dataTable').dataTable();

                        if ($(button).html() == 'Select All') {
                            thisTable.api().rows().every(function() {
                                $(this.node()).addClass(ROW_SELECTED_CLASS);
                                $(button).html('Deselect All');
                            });
                        } else if ($(button).html() == 'Deselect All') {
                            thisTable.api().rows().every(function() {
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

                        thisTable.api().rows().every(function() {
                            if (!$(this.node()).hasClass(ROW_SELECTED_CLASS)) {
                                $(button).closest('.dataTables_wrapper').find('[data-click-event=toggle-selected]').html('Select All');
                            }
                        });
                    });

                    //list table list/grid view toggle function
                    var toggleButton = $('[data-click-event=toggle-list-view]');
                    toggleButton.click(function() {
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
                    $('[data-click-event=delete-selected-rows]').click(function() {
                        var thisTable = $(this).closest('.dataTables_wrapper').find('.dataTable').dataTable();
                        thisTable.api().rows('.' + ROW_SELECTED_CLASS).remove().draw(false);
                    });

                    $('.random-thumbs .thumbnail.icon').random_background_color();

                }
            }, settings)
        );

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
    $.sidebar_toggle = function() {
        var elem = '[data-toggle=sidebar]';

        return $(elem).each(function() {
            $(elem).click(function(e) {
                e.preventDefault();

                var container = $(this).attr('data-container'),
                    target = $(this).attr('data-target');

                $(this).toggleAttr('aria-expanded', 'true', 'false');
                $(this).closest('li').toggleClass("active");

                if ($(this).attr('data-container-push')) {
                    $(container)
                        .toggleAttr('data-container-push', 'true', 'false')
                        .attr('data-push-side', $(this).attr('data-push-side'));
                } else if ($(this).attr('data-container-divide')) {
                    $(container)
                        .toggleAttr('data-container-divide', 'true', 'false')
                        .attr('data-divide-side', $(this).attr('data-divide-side'));
                }

                $(target)
                    .toggleClass("toggled")
                    .attr('data-side', $(this).attr('data-side'));
            });
        });
    };


}(jQuery));


(function($) {

    /**
     * Mutationobserver wrapper function
     * @usage  $(el).MutationObserverWrapper({
     *             config: {
     *                 childList : true
     *             },
     *             callback : function(mutationObj){
     *
     *             }
     *         })
     * @return {Null}
     */
    $.fn.MutationObserverWrapper = function(options) {

        if (isSupported() === false) {
            throw 'Mutation observer is not supported by your browser.'
        }

        var defaults = {
            config: {
                childList: true,
                attributes: true,
                characterData: true,
                subtree: true,
                attributeOldValue: true,
                characterDataOldValue: true,
                attributeFilter: []
            },
            callback: function(mutations) {
                mutations.forEach(function(mutation) {
                    console.log(mutation);
                })
            }
        };

        var target = $(this)[0];
        var plugin = $.fn.MutationObserverWrapper;
        var options = $.extend({}, defaults, options);

        var observer = new MutationObserver(options.callback);

        observer.observe(target, options.config);

    };

    function isSupported() {
        var prefixes = ['WebKit', 'Moz', 'O', 'Ms', ''];
        for (var i = 0; i < prefixes.length; i++) {
            if (prefixes[i] + 'MutationObserver' in window) {
                return window[prefixes[i] + 'MutationObserver'];
            }
        }
        return false;
    }

}(jQuery));

$(document).ready(function() {

    $('.tree-view').tree_view();
    $.file_input();
    $.sidebar_toggle();

    if(typeof $.fn.tooltip == 'function'){
        $('[data-toggle="tooltip"]').tooltip();
    }else{
        console.warn('Warning : Dependency missing - tooltip Library');
    }

    $('[data-state="loading"]').loading('show');

    $('.dropdown-menu input').click(function(e) {
        e.stopPropagation();
    });

    $(responsiveTextSleector).responsive_text(responsiveTextRatio);

    if(typeof $.fn.select2 == 'function'){
        $('.select2').select2();
    }else{
        console.warn('Warning : Dependency missing - Select2 Library');
    }

});

$(window).scroll(function() {
    $(responsiveTextSleector).responsive_text(responsiveTextRatio);
});

$(document).bind('click', function() {
    $(responsiveTextSleector).responsive_text(responsiveTextRatio);
});

$(function() {

    /***********************************************************
     *  if body element change call responsive text function
     ***********************************************************/
    var target = document.querySelector('body');
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            $(responsiveTextSleector).responsive_text(responsiveTextRatio);
        });
    });
    var config = {
        attributes: true,
        childList: true,
        characterData: true
    };
    observer.observe(target, config);

    if(typeof $.fn.tooltip == 'function'){
        $('[data-toggle="tooltip"]').tooltip();
    }else{
        console.warn('Warning : Dependency missing - tooltip Library');
    }

});