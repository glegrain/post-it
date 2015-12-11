/**
 * Module dependencies
 */

 var assert = require('assert');
 var http = require('http');
 var colors = require('colors');



var options = {
    hostname:  'localhost',
    port:  process.env.PORT || 3000,
    method: 'GET',
    path: '/notes'

};

var req = http.request(options, function(res) {
    console.log('requesting ..' );

    // assert correct status code
    console.log('Testing statusCode: statusCode = ', res.statusCode);
    assert(res.statusCode == 200);
    console.log('OK'.green);
});

req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});


req.end();