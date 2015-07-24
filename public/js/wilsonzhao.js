jQuery(window).on('load', function(){
    var $ = jQuery;     
    var $container = $('#mason');
        $container.masonry({
                      gutterWidth: 0,
                      itemSelector: '.project'
                });
});

