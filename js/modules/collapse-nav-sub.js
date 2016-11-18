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
