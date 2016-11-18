/**
 * Copy to clipboard function using ZeroClipboard plugin
 * @return object
 */
$.fn.zclip = function() {

    if(typeof ZeroClipboard == 'function'){
        var client = new ZeroClipboard( this );
        client.on( "ready", function( readyEvent ) {
          client.on( "aftercopy", function( event ) {
            var target = $(event.target);
            target.attr("title","Copied!")
            target.tooltip('enable');
            target.tooltip("show");
            target.tooltip('disable');
          });
        });
    }else{
        console.warn('Warning : Dependency missing - ZeroClipboard Library');
    }
    return this;
};
