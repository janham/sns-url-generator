$(document).ready(function() {
    $(".copy-btn").on({
        'mouseenter':function(){
            var text = $(this).attr('data-text');
            if(text === 'copy'){
                chipText = 'Copy'
            }
            $(this).append('<div class="tooltips">' + chipText + '</div>');
        },
        'mouseleave':function(){
            $(this).find(".tooltips").remove();
        }
    });

    $(window).on('scroll', function(){
        let scrollTop = $(window).scrollTop();
        if(scrollTop >= 96){
            $('.header').slideUp();
        }else{
            $('.header').slideDown();

        }
    });

    $('.header__tag-g-icon-wrap').on('click', function() {
        $('#modal').fadeIn();
        $('.modal__mask').fadeIn();
    });
    $('.modal__close').on('click', function() {
        $('#modal').fadeOut();
        $('.modal__mask').fadeOut();
    });
});
