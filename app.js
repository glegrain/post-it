
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var notes = require('./routes/notes');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//app.get('/', routes.index);
//app.get('/users', user.list); //list users

// Add headers to allow cross domain requests
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');  // '*' all domains
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST,  PUT, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    //res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

app.get('/notes', notes.getNotes); // list notes
app.post('/notes', notes.postNote); // create a new note
app.put('/notes', function(req,res){throw new Error(); }); // error
app.delete('/notes', notes.deleteNotes ); // delete all notes
app.get('/notes/:id', notes.getNote);
app.put('/notes/:id', notes.putNote); // if exist update note, else error
app.post('/notes/:id', function(req,res){throw new Error(); }); // creates a new note
app.delete('/notes/:id', notes.deleteNote); // delete note

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
