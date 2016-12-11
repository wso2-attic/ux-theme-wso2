function windowEvents(){
    $('.sidebar-wrapper').each(function(){
        var elemOffsetBottom = $(this).data('offset-bottom'),
            scrollBottom = ($(document).height() - $(window).height()),
            offesetBottom = 0,
            getBottomOffset = elemOffsetBottom - (scrollBottom - ($(window).scrollTop()-elemOffsetBottom) - elemOffsetBottom);
        
        if(getBottomOffset > 0){
            offesetBottom = getBottomOffset;
        }
        
        $(this).height(($(window).height() - ($(this).offset().top - $(window).scrollTop())) - offesetBottom);
        
        if((typeof $.fn.nanoScroller == 'function') && ($('.nano-content', this).length > 0)){
            $(".nano-content").parent()[0].nanoscroller.reset();
        }
    }); 
};
    
$(window)
    .ready(windowEvents)
    .resize(windowEvents)
    .scroll(windowEvents);

var responsiveTextRatio = 0.2,
    responsiveTextSleector = ".icon .text";

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

    $('.dropdown-menu input').click(function(e) {
        e.stopPropagation();
    });

    $(responsiveTextSleector).responsive_text(responsiveTextRatio);

    if(typeof $.fn.select2 == 'function'){
        $('.select2').select2();
    }else{
        console.warn('Warning : Dependency missing - Select2 Library');
    }

    if(typeof $.fn.collapse == 'function') {
        $('.navbar-collapse.tiles').on('shown.bs.collapse', function () {
            $(this).collapse_nav_sub();
        });
    }
    else {
        console.warn('Warning : Dependency missing - Bootstrap Collapse Library');
    }


    $('.media.tab-responsive [data-toggle=tab]').on('shown.bs.tab', function(e){
        console.log("shown");
        var activeTabPane = $(e.target).attr('href'),
            activeCollpasePane = $(activeTabPane).find('[data-toggle=collapse]').data('target'),
            activeCollpasePaneSiblings = $(activeTabPane).siblings().find('[data-toggle=collapse]').data('target'),
            activeListGroupItem = $('.media .list-group-item.active');

        $(activeCollpasePaneSiblings).collapse('hide');
        $(activeCollpasePane).collapse('show');
        positionArrow(activeListGroupItem);

        $(".panel-heading .caret-updown").removeClass("fw-sort-down");
        $(".panel-heading.collapsed .caret-updown").addClass("fw-sort-up");
    });

    $('.media.tab-responsive .tab-content').on('shown.bs.collapse', function(e){
        var activeTabPane = $(e.target).parent().attr('id');
        $('.media.tab-responsive [data-toggle=tab][href=#'+activeTabPane+']').tab('show');
        $(".panel-heading .caret-updown").removeClass("fw-sort-up");
        $(".panel-heading.collapsed .caret-updown").addClass("fw-sort-down");
    });

    function positionArrow(selectedTab){
        var selectedTabHeight = $(selectedTab).outerHeight();
        var arrowPosition = 0;
        var totalHeight = 0;
        var arrow = $(".media .panel-group.tab-content .arrow-left");
        var parentHeight = $(arrow).parent().outerHeight();

        if($(selectedTab).prev().length){
            $(selectedTab).prevAll().each(function() {
                 totalHeight += $(this).outerHeight();
            });
            arrowPosition = totalHeight + (selectedTabHeight / 2);
        }else{
            arrowPosition = selectedTabHeight / 2;
        }

        if(arrowPosition >= parentHeight){
            parentHeight = arrowPosition + 10;
            $(arrow).parent().height(parentHeight);
        }else{
            $(arrow).parent().removeAttr("style");
        }
        $(arrow).css("top",arrowPosition - 10);
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
        console.warn('Warning : Dependency missing - Bootstrap Tooltip Library');
    }

});
