$(document).ready(function () {
    $('.titel').click(function (event) {
        if($('.content').hasClass('one')){
            console.log("t")
            $('.titel').not($(this)).removeClass('active');
            $('.discription').not($(this).next()).slideUp(300);
        }
        $(this).toggleClass('active').next().slideToggle(300);
    })
})