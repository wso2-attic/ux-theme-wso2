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
