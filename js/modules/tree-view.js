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
