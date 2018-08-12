/// <reference path="jquery-3.1.1.js" />

$(document).ready(function () {
    $('#slideNext').click(nextSlide);
    $('#slideBack').on('click', previousSlide);
    $('.icon').click(toggleCollapse);
    
    slideshowInit();
    window.setInterval(nextSlide, 5000)

});

var slideNum;
var n;
function slideshowInit() {
    slideNum = 1;
    n = $('.slide').length;
    $('#slide_1').fadeIn(1000);
   
    for (i = 2; i <= n; i++) {
        $('#slide_' + i).fadeOut(1000);
    }
}
function nextSlide() {
    var $slide = $('#slide_' + slideNum);
    var $next;
    $slide.fadeOut(2000);
    if (slideNum == n) {
        slideNum = 1;
        $next = $('#slide_1');
    } else {
        $next = $('#slide_' + (slideNum + 1));
        slideNum++;
    }
    $next.fadeIn(2000);
}

function previousSlide() {

    var $slide = $('#slide_' + slideNum);
    var $next;
    $slide.fadeOut(2000);
    if (slideNum == 1) {
        slideNum = n;
        $next = $('#slide_' + slideNum);
    } else {
        $next = $('#slide_' + (slideNum - 1));
        slideNum--;
    }
    $next.fadeIn(2000);
}

function toggleCollapse() {
    $('.navbar').toggleClass('collapse');
}



