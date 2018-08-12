/// <reference path="jquery-3.1.1.js" />
$(document).ready(function () {
    $('#submit').on('click', contactMe);
});

function contactMe() {
    var formData = $('form[name="ContactForm"]').serialize();
    $.post('/SendMessage', formData, function (returnedObject) {
        $('#result').html(returnedObject.result);
        $('#contactForm').hide();
    }, 'json');
}