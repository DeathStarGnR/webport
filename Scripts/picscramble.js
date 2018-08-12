/// <reference path="jquery-3.1.1.js" />
/// <reference path="jquery-ui-1.12.1.js" />
/// <reference path="jquery-ui-touch-punch.js" />
$(document).ready(function() {
    
    createBoard();
    addTiles();
    $('#btnScramble').on('click', function () {
        scramble();
        eval();
    });
    $('#btnShowNum').on('click', toggleNum);
    init();
    scramble();
    eval();
    
});


var squareNum = 16;
var empty = 16;

function createBoard() {
     
    for (var i = 1; i <= squareNum; i++) {
        var $square = $('<div id="square' + i + '" class="square"></div>');
        $square.appendTo($('#board'));
        $square.data('square', i);

    }
    $('#square' + empty).addClass('empty');
}

function addTiles() {

    for (var i = 1; i < squareNum; i++) {
        var $tile = $('<div id="tile' + i + '" class="tile"></div>');
        var $square = $('#square' + i);
        var pic = "'./Images/Puzzle01/image_" + i + ".jpg'";
        $tile.appendTo($square);
        $tile.data('tile', i);

        var location = $tile.parent().data('square');
        $tile.html('<span class="num">' + location + '</span>');
        $tile.data('location', location);
        $tile.css("background-image", "url(" + pic + ")");
        $(".num").hide();
    }
}

function init() {
    $('.tile').draggable({
        revert: 'invalid',
        containment: '#board'
        
    });
    switchDrop();
    eval();
}

function toggleNum() {
    $(".num").toggle();
}

function switchDrop() {
    $('.empty').droppable({
        accept: '.tile',
        hoverClass: 'hovered',
        drop: handleDrop

    });
}

function disableDrag() {
    $('.tile').draggable('disable');
}


function handleDrop( event, ui ) {
        var squareNum = $(this).data('square');
        var tileNum = ui.draggable.data('tile');
        var prevLocation = ui.draggable.data('location');
        ui.draggable.data('location', squareNum);

        $(this).removeClass('empty');
        $('#square' + prevLocation).addClass('empty');

        ui.draggable.detach();
        $(this).append(ui.draggable);
        
        ui.draggable.position({
            of: $(this),
            my: 'left top',
            at: 'left+1 top+1'
        });
        var location = ui.draggable.parent().data('square');
        //ui.draggable.html('T=' + tileNum + '</br>CL='+ location + '</br>PL=' + prevLocation);
        $(this).droppable('disable');
        switchDrop();
        eval();
}

function eval() {
    var empty = $('.empty').data('square');
    var first;
    var second;
    var third;
    var fourth;
    
    if (empty == 1) {
        first = empty + 1;
        second = empty + 4;
        disableDrag();
        $('#square' + first).children().draggable('enable');
        $('#square' + second).children().draggable('enable');
    } else if (empty == 4) {
        first = empty - 1;
        second = empty + 4;
        disableDrag();
        $('#square' + first).children().draggable('enable');
        $('#square' + second).children().draggable('enable');
    } else if (empty == 13) {
        first = empty + 1;
        second = empty - 4;
        disableDrag();
        $('#square' + first).children().draggable('enable');
        $('#square' + second).children().draggable('enable');
    } else if (empty == 16) {
        first = empty - 1;
        second = empty - 4;
        disableDrag();
        $('#square' + first).children().draggable('enable');
        $('#square' + second).children().draggable('enable');
    } else if (empty == 2 || empty == 3) {
        first = empty - 1;
        second = empty + 1;
        third = empty + 4;
        disableDrag();
        $('#square' + first).children().draggable('enable');
        $('#square' + second).children().draggable('enable');
        $('#square' + third).children().draggable('enable');
    } else if (empty == 5 || empty == 9) {
        first = empty - 4;
        second = empty + 4;
        third = empty + 1;
        disableDrag();
        $('#square' + first).children().draggable('enable');
        $('#square' + second).children().draggable('enable');
        $('#square' + third).children().draggable('enable');
    } else if (empty == 8 || empty == 12) {
        first = empty - 4;
        second = empty + 4;
        third = empty - 1;
        disableDrag();
        $('#square' + first).children().draggable('enable');
        $('#square' + second).children().draggable('enable');
        $('#square' + third).children().draggable('enable');
    } else if (empty == 14 || empty == 15) {
        first = empty - 1;
        second = empty - 4;
        third = empty + 1;
        disableDrag();
        $('#square' + first).children().draggable('enable');
        $('#square' + second).children().draggable('enable');
        $('#square' + third).children().draggable('enable');
    } else if (empty == 6 || empty == 7 || empty == 10 || empty == 11) {
        first = empty + 1;
        second = empty - 1;
        third = empty + 4;
        fourth = empty - 4;
        disableDrag();
        $('#square' + first).children().draggable('enable');
        $('#square' + second).children().draggable('enable');
        $('#square' + third).children().draggable('enable');
        $('#square' + fourth).children().draggable('enable');
    }
    $('.empty').droppable('enable');
    checkforwin();
}

function scramble() {
        
    for (i = 0; i < 128; i++) {
        var rand = Math.floor(Math.random() * 15) + 1;
        var $tile = $('#tile' + rand);
        var prevLoc = $tile.data('location');
        
        $tile.detach();
        $('.empty').append($tile);
        $tile.position({
            of: '.empty',
            my: 'left top',
            at: 'left+1 top+1'
        });
        $('.empty').droppable('disable');
        $('.empty').removeClass('empty');
        $('#square' + prevLoc).addClass('empty');
                
        switchDrop();
        var squareNum = $tile.parent().data('square');
        $tile.data('location', squareNum);
    }
}

function checkforwin() {
    var matching = 0; 
    for (i = 1; i <= 15; i++) {
        var $tile = $('#tile' + i);
        var x = $tile.data('tile');
        var y = $tile.parent().data('square');
        if (x == y) {
            matching++;
        }
    }
    if (matching == 15) {
        $('#title').html('WINNER!');
    } else {
        $('#title').html('Picture Scramble')
    }
    
}