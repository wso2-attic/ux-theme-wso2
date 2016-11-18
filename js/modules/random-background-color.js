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
