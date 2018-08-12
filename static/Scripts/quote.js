/// <reference path="jquery-ui-1.12.1.js" />
/// <reference path="jquery-ui-touch-punch.js" />
/// <reference path="jquery-3.1.1.js" />
$(document).ready(function () {
    newQuote();
    $("#getQuote").click(newQuote);
    $("#tweet").click(tweetThis);
    //$(".btn").click(function (event) {
    //    // Removes focus of the button.
    //    $(this).blur();
    //});
});


var tweetPrefix = "https://twitter.com/intent/tweet?hashtags=quotes&related=&text=";
var tweetText = "";

function newQuote() {
    tweetText = "";
    var qa = "";
    var randNum = Math.floor(Math.random() * 100);
    $.getJSON("https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=" + randNum, function (a) {
        var q = a[0].content;
        var author = '<p><span class = "author" style = "float: right; margin-top: 5px 15px 15px 0;">- ' + a[0].title + "</span></p>";
        newQ = q.slice(3, q.length - 5);
        //removes the <p> and </p> from the api content

        qa = '<p>"' + newQ + '"</p>' + author;
        tweetText = tweetPrefix + encodeURIComponent('"' + newQ + '" ' + '--' + a[0].title);
        $("#quoteArea").html(qa);
    });
}
function tweetThis() {
    $("#tLink").attr("href", tweetText)
}



