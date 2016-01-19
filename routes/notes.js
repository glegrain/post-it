// app.get('/notes', notes.getNotes); // list notes
// app.post('/notes', function(req,res){throw new Error(); }); // error
// app.delete('/notes', notes.deleteNotes ); // delete all notes
// app.get('/notes/:id', notes.getNote);
// app.put('/notes/:id', notes.putNote); // if exist update note, else error
// app.post('/notes/:i', notes.postNote); // creates a new note
// app.delete('/notes/:id', notes.deleteNote); // delete note

// load MongoDB post-it note model
var Note = require('../models/Notes');

var notes = [
    {
      "title": "Title",
      "message": "message ...",
      "x": "819.6099853515625px",
      "y": "274.6099853515625px",
      "color": "#ccff66",
      "id": 0
    },
    {
      "title": "Instructions",
      "message": "Use your arrow keys to navigate.\n\nUse 'o' to zoom out.\n\nUse 'p' to zoom in.",
      "x": "915.0943603515625px",
      "y": "104.09437561035156px",
      "color": "#ccff66",
      "id": 1
    },
    {
      "title": "Title",
      "message": "message ...",
      "x": "542.6099853515625px",
      "y": "369.6099853515625px",
      "color": "#3366ff",
      "id": 2
    },
    {
      "title": "Title",
      "message": "message ...",
      "x": "935.6099853515625px",
      "y": "149.61000061035156px",
      "color": "#ff802f",
      "id": 3
    },
    {
      "title": "Welcome !",
      "message": "Please feel free to comment by adding your own posts !",
      "x": "526.4068603515625px",
      "y": "159.40687561035156px",
      "color": "#3366ff",
      "id": 4
    },
    {
      "title": "Info",
      "message": "Note how the title is selected when you click on it.",
      "x": "255.7974853515625px",
      "y": "392.7974853515625px",
      "color": "#ff802f",
      "id": 5
    },
    {
      "title": "Tip",
      "message": "There is no option to change to color of a postit. (well if you'r hardcore, you can always change its property and it will automatically be saved to the server, magic !)\n\n",
      "x": "24.485000610351563px",
      "y": "126.48500061035156px",
      "color": "#ccff66",
      "id": 6
    }
];



/*
 * GET notes listing.
 */
// app.get('/notes', notes.getNotes); // list notes
exports.getNotes = function(req, res){
  Note.find(function(err, notes) {
    if (err) return res.json(400, {error:'Error finding notes'});
    return res.json({"items":  notes });
  });
};


/*
 * GET note by id.
 */
// app.get('/notes/:id', notes.getNote);
exports.getNote = function(req, res) {
  var query = Note.findById(req.params.id);
  query.exec(function(err, note) {
    if (err) return res.json(404, {error: err});
    return res.json(note);
  });
};


/*
 * PUT if exist update note, else error
 */
// app.put('/notes/:id', notes.putNote); // if exist update note, else error
exports.putNote = function(req, res) {
    // console.log('Updating note ...');
    // console.log(req.body);
    Note.update({_id: req.params.id}, req.body, null, function(err, raw) {
      if (err) return res.json(500, {error: err});
      return res.send(200);
    });
};

/*
 * POST a new note
 */
// app.post('/notes/', notes.postNote); // creates a new note
exports.postNote = function(req, res){
    // console.log('Adding new note ...');
    // console.log(req.body);
    var newNote = new Note(req.body);
    newNote.save(function(err, note) {
      if (err) {
        return res.json(400, {error:'Failed to save note: ' + newNote});
      }
      return res.json(201, note);
    });
};

/*
 * DELETE note.
 */
// app.delete('/notes/:id', notes.deleteNote); // delete note
exports.deleteNote = function(req, res){
    Note.remove({
      _id: req.params.id
    }, function(err, note) {
      if (err) return res.json(404, {error: err});
      return res.json(201);
    });
};

/*
 * DELETE all notes.
 */
// app.delete('/notes', notes.deleteNotes ); // delete all notes
exports.deleteNotes = function(req, res){
  // empty filter to remove all notes
  Note.remove({}, function(err) {
    console.log(err);
    return res.send(200);
  });
};
