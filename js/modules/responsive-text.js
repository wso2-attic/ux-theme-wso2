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
