/// <reference path="jquery-3.1.1.js" />
/// <reference path="jquery-ui-1.12.1.js" />
/// <reference path="jquery-ui-touch-punch.js" />

var squareCount = 16
var emptySquare;


$(document).ready(function () {

    createBoard();
    addTiles();
    $('#gameBoard').on('dragstart', dragStarted);
    $('#gameBoard').on('dragend', dragEnded);
    $('#gameBoard').on('dragenter', preventDefault);
    $('#gameBoard').on('dragover', preventDefault);
    $('#gameBoard').on('drop', drop);
    $('#btnScramble').on('click', scramble);
    $('#btnShowNum').on('click', toggleNum);
    scramble();
    checkForWinner();
    
    
    
});

function createBoard() {
    for (var i = 0; i < squareCount; i++) {
        var $square = $('<div id = "square' + i + '" data-square="'
            + i + '" class="square"></div>');
        $square.appendTo($('#gameBoard'));
    }
}

function addTiles() {
    emptySquare = squareCount - 1;
    for (var i = 0; i < emptySquare; i++) {
        var $square = $('#square' + i);
        var pic = "'/Images/Puzzle01/image_" + (i + 1) + ".jpg'";
        var $tile = $('<div draggable="true" id="tile' + i + '" class="tile ui-widget-content"><span class="num">' + (i + 1) + '</span></div>');
        $tile.data('square', i);
        $tile.appendTo($square);
        $('#square' + emptySquare).addClass('empty').data('square', emptySquare);
        $("#tile" + i).css("background-image", "url(" + pic + ")");
        $(".num").hide();
    }
}

function scramble() {
    for (var i = 0; i < 128; i++) {
        var random = Math.random()
        var sourceLocation;
        if (random < 0.5) {
            var column = emptySquare % 4
            if (column == 0 || (random < 0.25 && column != 3)) {
                sourceLocation = emptySquare + 1;
            }
            else {
                sourceLocation = emptySquare - 1;
            }
        }
        else {
            var row = Math.floor(emptySquare / 4)
            if (row == 0 || (random < 0.75 && row != 3)) {
                sourceLocation = emptySquare + 4;
            }
            else {
                sourceLocation = emptySquare - 4;
            }
        }
        
        swapTileAndEmptySquare(sourceLocation);
    }
    //$('.tile').css('border', '2px solid black');
    //$('.square').css('border', '2px solid black');
    //$('#gameBoard').css('padding-left', '100px');
    $('#message').html('Picture Puzzle');
}

function swap(sourceLocation) {

}

function checkForWinner() {
    if (emptySquare != squareCount - 1) return;
    for (var i = 0; i < emptySquare; i++) {
        if ($('#tile' + i).parent().attr('id') != 'square' + i) return;
    }
    $('.square').css('border', 'none');
    $('#gameBoard').css('padding-left', '25px');
    $('#message').html('Winner!');

}

function toggleNum() {
    $(".num").toggle();
}

function dragStarted(e) {
    var $tile = $(e.target)
    $tile.addClass('dragged');
    var sourceLocation = $tile.parent().data('square');

    e.originalEvent.dataTransfer.setData('text', sourceLocation.toString());
    e.originalEvent.dataTransfer.effectAllowed = 'move';
}
function dragStarted(e) {
    var $tile = $(e.target)
    $tile.addClass('dragged');
    var sourceLocation = $tile.parent().data('square');
    e.originalEvent.dataTransfer.setData('text', sourceLocation.toString());
    e.originalEvent.dataTransfer.effectAllowed = 'move';
}

function dragEnded(e) {
    $(e.target).removeClass('dragged');
}

function preventDefault(e) {
    e.preventDefault();
}

function drop(e) {
    var $square = $(e.target);
    if ($square.hasClass('square')) {
        var destinationLocation = $square.data('square');
        if (emptySquare != destinationLocation) return;
        var sourceLocation = Number(e.originalEvent.dataTransfer.getData('text'));
        moveTile(sourceLocation);
        checkForWinner();
    }
}

function moveTile(sourceLocation) {
    var distance = sourceLocation - emptySquare;
    if (distance < 0) distance = -(distance);
    if (distance == 1 || distance == 4) {
        swapTileAndEmptySquare(sourceLocation);
    }
}

function swapTileAndEmptySquare(sourceLocation) {
    var $draggedItem = $('#square' + sourceLocation).children();
    $draggedItem.detach();
    var $target = $('#square' + emptySquare);
    $draggedItem.appendTo($target);
    emptySquare = sourceLocation;
}



