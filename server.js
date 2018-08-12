var express = require('express');
var path = require('path');
var app = express();
var formidable = require('formidable');

app.use(express.static(__dirname + '/static'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/SendMessage', function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, field) {
        var lastName = field.lastName
            , firstName = field.firstName
            , email = field.email
            , message = field.message
            , result = 'Message sent successfully.<br />' + 'Thank you for your interest,' + firstName + ' ' + lastName + '.<br />' +
            ' I will reply to your message shortly at ' + email + '.<br />' +
            '<Have a great day!>';
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end('{"result": "' + result + '"}');
        console.log('Handled service request for ' + firstName + ' ' + lastName);

    });

});

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
    var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

    app.listen(server_port, server_ip_address, function () {
        console.log("Listening on " + server_ip_address + ", port " + server_port)
    });