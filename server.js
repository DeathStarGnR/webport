var express = require('express');
var path = require('path');
var app = express();
var formidable = require('formidable');

//Begin test code for mySQL
var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 100,
    //host: 'localhost',
    //user: 'root',
    //password: 'admin',
    host: '127.8.202.2',
    user: 'adminFyhxWea',
    password: '5aRdcAnihqNt',
    database: 'webportfolio',
    debug: false
});
//Begin test code for mySQL

app.use(express.static(__dirname + '/static'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/SendMessage', function (req, res) {
    var form = new formidable.IncomingForm();
    //var connection = mysql.createConnection({
    //    host: 'localhost',
    //    user: 'root',
    //    password: 'admin',
    //    database: 'webportfolio'
    //});
    var lastName;
    var firstName;
    var email;
    var message;
    
    form.parse(req, function (err, field) {
        
        lastName = field.lastName;
        firstName = field.firstName;
        email = field.email;
        message = field.message;
        result = 'Message sent successfully.<br />' + 'Thank you for your interest,' + firstName + ' ' + lastName + '.<br />' +
           ' I will reply to your message shortly at ' + email + '.<br />' +
           '<Have a great day!>';
        //connection.connect(function (err) {
        //    if (!err) {
        //        console.log("Database is connected ... nn");
        //    } else {
               
        //        console.log("Error connecting database ... nn");
                
        //        console.log(err);
        //    }
        //});
        
        //connection.query('INSERT INTO messages VALUES(0' + ', "' + firstName + '", "' + lastName + '", "' + email + '", "' + message + '", now())', function (err) {
        
            
        //    if (!err) {
        //        console.log('Row Inserted.');
        //        }

        //    else {
                
        //        console.log('Error while performing Query.');
        //        console.log(err);
        //    }
        //    connection.end();
        //});
        storeMessage(req, res, firstName, lastName, email, message);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end('{"result": "' + result + '"}');
        console.log('Handled service request for ' + firstName + ' ' + lastName);
    });
});
function storeMessage(req, res, firstName, lastName, email, message) {
    pool.getConnection(function(err,connection){
        if (err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
        }   

        console.log('connected as id ' + connection.threadId);
        
        connection.query('INSERT INTO messages VALUES(0' + ', "' + firstName + '", "' + lastName + '", "' + email + '", "' + message + '", now())', function (err) {
            connection.release();
            if(!err) {
                console.log('Row Inserted.');
            }           
        });

        connection.on('error', function(err) {      
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;     
        });
    });
}
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

app.listen(server_port, server_ip_address, function () {
    console.log("Listening on " + server_ip_address + ", port " + server_port)
});