jQuery(window).on('load', function(){
    var $ = jQuery;     
    var $container = $('#mason');
        $container.masonry({
                      columnWidth:10, 
                      gutterWidth: 0,
                      itemSelector: '.project'
                });
});

