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
