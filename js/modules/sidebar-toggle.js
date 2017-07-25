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
    
    /**
     * Dynamically adjust the height of sidebar to fill parent
     */
    function sidebarHeightAdjust(){
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

    var sidebar_window = {
        update: function(target, container, button){
            conrainerOffsetLeft = $(container).data('offset-left') ? $(container).data('offset-left') : 0,
            conrainerOffsetRight = $(container).data('offset-right') ? $(container).data('offset-right') : 0,
            targetTop = $(target).data('top') ? $(target).data('top') : 0,
            targetOffsetLeft = $(target).data('offset-left') ? $(target).data('offset-left') : 0,
            targetOffsetRight = $(target).data('offset-right') ? $(target).data('offset-right') : 0,
            targetWidth = $(target).data('width'),
            targetSide = $(target).data("side"),
            pushType = $(container).parent().is('body') == true ? 'padding' : 'padding'; //TODO: Remove if works everywhere
            
            $(container).addClass('sidebar-target');

            if(button !== undefined){
                relationship = button.attr('rel') ? button.attr('rel') : '';
                buttonParent = $(button).parent();
            }
            
            $(target).css('top', targetTop);

            sidebarHeightAdjust();
        },
        show: function(){  
            if($(target).data('sidebar-fixed') == true) {
                $(target).height($(window).height() - $(target).data('fixed-offset'));
            } 
            
            $(target).off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
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
                if ($(target).attr('data-container-divide')){
                   $(container).css(pushType+'-'+targetSide, targetWidth + targetOffsetLeft);
                   $(target).css(targetSide, targetOffsetLeft);
                }
                else if ($(target).attr('data-container-push')){
                   $(container).css(targetSide,  Math.abs(targetWidth + targetOffsetLeft));
                   $(target).css(targetSide, -Math.abs(targetWidth + targetOffsetLeft));
                }
                else {
                   $(target).css(targetSide, Math.abs(targetOffsetLeft)); 
                }
            }
            else if (targetSide == 'right'){
                if ($(target).attr('data-container-divide')){
                   $(container).css(pushType+'-'+targetSide, targetWidth + targetOffsetRight);
                   $(target).css(targetSide, targetOffsetRight);
                }
                else if ($(target).attr('data-container-push')){
                   $(container).css(targetSide, Math.abs(targetWidth + targetOffsetRight));
                   $(target).css(targetSide,  -Math.abs(targetWidth + targetOffsetRight));
                }
                else {
                   $(target).css(targetSide, Math.abs(targetOffsetRight));
                }
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
                if($(target).attr('data-container-divide')){
                    $(container).css(pushType+'-'+targetSide, targetOffsetLeft);
                    $(target).css(targetSide, -Math.abs(targetWidth + targetOffsetRight));
                }
                else if($(target).attr('data-container-push')){
                    $(container).css(targetSide, targetOffsetLeft);
                    $(target).css(targetSide, -Math.abs(targetWidth + targetOffsetLeft));
                }
                else {
                    $(target).css(targetSide, -Math.abs(targetWidth + targetOffsetLeft));
                }
            }
            else if (targetSide == 'right'){
                if($(target).attr('data-container-divide')){
                    $(container).css(pushType+'-'+targetSide, targetOffsetRight);
                    $(target).css(targetSide, -Math.abs(targetWidth + targetOffsetRight));
                }
                else if($(target).attr('data-container-push')){
                    $(container).css(targetSide, targetOffsetRight);
                    $(target).css(targetSide, -Math.abs(targetWidth + targetOffsetRight));
                }
                else {
                    $(target).css(targetSide, -Math.abs(targetWidth + targetOffsetRight)); 
                }
            }

            $(target).trigger('hidden.sidebar');
            $(target).on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
                $(container).removeClass('sidebar-target');
            });
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
        target = button.data('target');
        container = $(target).data('container');
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
    
    $(window)
        .load(sidebarHeightAdjust)
        .resize(sidebarHeightAdjust)
        .scroll(sidebarHeightAdjust);

};

$('.sidebar-wrapper[data-fixed-offset-top]').on('affix.bs.affix', function() {
    $(this).css('top', $(this).data('fixed-offset-top'));
});
