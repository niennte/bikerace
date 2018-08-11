$(document).ready(function() {
    /* show lightbox when clicking a thumbnail */
    $('a.zoom').click(function(event){
        event.preventDefault();
        let content = $('.image-wrapper');
        content.empty();
        let title = $(this).attr("title");
        $('.modal-title').html(title);
        content.html($(this).html());
        $(".modal-profile").modal({show:true});
    });

});