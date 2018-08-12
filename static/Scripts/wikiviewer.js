/// <reference path="jquery-3.1.1.js" />
$(document).ready(function () {
    $('.search').click(showSearch);
    $('#go').on('click', go);
    $(document).keypress(function (event) {
        var keycode = event.keyCode || event.which;
        if (keycode == '13') {
            
            go();
            
        }
    });
    
});

function go() {
    
    $('#results').html('');
    var prefix = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&prop=pageimages|extracts&piprop=thumbnail&pithumbsize=300&pilimit=max&exintro&explaintext&exchars=250&exlimit=max&callback=?&gsrsearch=";
    var search = $('#txtSearch').val();
    var param = prefix + search;
        
    $.getJSON(param, function (data) {
        
        var result = data.query.pages,
            linkPrefix = "https://en.wikipedia.org/?curid=",
            title = '',
            pageID = '',
            image = '',
            extract = '',
            n = 1,
            div = '';
        
        for (i in result) {
            if (result[i].hasOwnProperty("title")) {
                title = "<div class='title'>" + result[i].title + "</div>";
            } else {
                title = "<div class='title'>No title.</div>";
            }
            if (result[i].hasOwnProperty("extract")) {
                extract = "<div class='extract'>" + result[i].extract + "</div>";
            } else {
                extract = "<div class='extract'>No extract available.</div>";
            }
            if (result[i].hasOwnProperty("thumbnail")) {
                image = "<div class='thumb'><img src='" + result[i].thumbnail.source + "' /></div>";
            } else {
                image = "<div class='thumb'>No image</div>";
            }
            if (result[i].hasOwnProperty("pageid")) {
                pageID = result[i].pageid;
            } else {
                pageID = "#";
            }
            div = "<a href='" + linkPrefix + pageID + "'>" + "<div id='result" + n + "' class='resultBox row' style='display: none;'>" + image + "<div class='content'>" + title + extract + "</div></div></a>"
            $('#results').append(div);
            $('#result' + n).show('slow');
            n++;
        }
       
    }); 
    
    //display(title);
}



function display(title) {
    $('#results').html(title);
}

function showSearch() {
    $('#innerRectangle').toggle(100);
}