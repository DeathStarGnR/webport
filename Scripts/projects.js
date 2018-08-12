$(document).ready(function () {
    $('.divBtn').on('click', function () {
        var name = $(this).data('name');
        showModal(name);
    });
    $('.modal').click(closeModal);
    $('.modalContent').click(function (e) {
        e.stopPropagation();
    })
    $('.close').on('click', closeModal);
    $('.btnBack').click(closeModal);
});

function closeModal(){
    $('.modalContent').slideUp(function(){
        $('.modal').fadeOut(500);
    });
       
    
}

function showModal(name) {
    $('#modal' + name).fadeIn(500, function () {
        $('.modalContent').slideDown();
    });
}

//$("button").click(function () {
//    $("div").animate({
//        height: 'toggle'
//    });
//});