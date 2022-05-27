$(document).ready(function () {
    $('.titel').click(function (event) {
        if($('.vacancys').hasClass('one')){
            console.log("t")
            $('.titel').not($(this)).removeClass('active');
            $('.text').not($(this).next()).slideUp(300);
        }
        $(this).toggleClass('active').next().slideToggle(300);
    })
})