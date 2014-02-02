// app.get('/notes', notes.getNotes); // list notes
// app.post('/notes', function(req,res){throw new Error(); }); // error
// app.delete('/notes', notes.deleteNotes ); // delete all notes
// app.get('/notes/:id', notes.getNote);
// app.put('/notes/:id', notes.putNote); // if exist update note, else error
// app.post('/notes/:i', notes.postNote); // creates a new note
// app.delete('/notes/:id', notes.deleteNote); // delete note



var notes = [
           {
      "title": "Title",
      "message": "message ...",
      "x": "274.6099853515625px",
      "y": "819.6099853515625px",
      "color": "#ccff66",
      "id": 1
    },
    {
      "title": "Instructions",
      "message": "Use your arrow keys to navigate.\n\nUse 'o' to zoom out.\n\nUse 'p' to zoom in.",
      "x": "104.09437561035156px",
      "y": "915.0943603515625px",
      "color": "#ccff66",
      "id": 1
    },
    {
      "title": "Title",
      "message": "message ...",
      "x": "369.6099853515625px",
      "y": "542.6099853515625px",
      "color": "#3366ff",
      "id": 4
    },
    {
      "title": "Title",
      "message": "message ...",
      "x": "149.61000061035156px",
      "y": "935.6099853515625px",
      "color": "#ff802f",
      "id": 5
    },
    {
      "title": "Welcome !",
      "message": "Please feel free to comment by adding your own posts !",
      "x": "159.40687561035156px",
      "y": "526.4068603515625px",
      "color": "#3366ff",
      "id": 4
    },
    {
      "title": "Info",
      "message": "Note how the title is selected when you click on it.",
      "x": "392.7974853515625px",
      "y": "255.7974853515625px",
      "color": "#ff802f",
      "id": 5
    },
    {
      "title": "Tip",
      "message": "There is no option to change to color of a postit. (well if you'r hardcore, you can always change its property and it will automatically be saved to the server, magic !)\n\n",
      "x": "126.48500061035156px",
      "y": "24.485000610351563px",
      "color": "#ccff66",
      "id": 6
    }
];

/*
 * GET notes listing.
 */
// app.get('/notes', notes.getNotes); // list notes
exports.getNotes = function(req, res){
  res.json({
    //"href": "http://postit.herokuapp.com/notes",
    "items":  notes
  });
};


/*
 * GET note by id.
 */
// app.get('/notes/:id', notes.getNote);
exports.getNote = function(req, res){
    var id = req.params.id;
    if (notes[id]) res.json(notes[id]);
    else res.json(400, {error:'Could not find your note'});
};


/*
 * PUT if exist update note, else error
 */
// app.put('/notes/:id', notes.putNote); // if exist update note, else error
exports.putNote = function(req, res){
    // console.log('Updating note ...');
    // console.log(req.body);
    var id = req.params.id;
    // TODO: check it cannot create
    if (notes[id] = req.body) {
        return res.json(201);
    }
    return new Error();
    
};

/*
 * POST a new note
 */
// app.post('/notes/', notes.postNote); // creates a new note
exports.postNote = function(req, res){
    // console.log('Adding new note ...');
    // console.log(req.body);
    var id = notes.length; // since we append to the array
    req.body.id = id;
    notes.push(req.body);
    res.location('/notes/' + id);
    res.json(201, notes[id]);
};

/*
 * DELETE note.
 */
// app.delete('/notes/:id', notes.deleteNote); // delete note
exports.deleteNote = function(req, res){
    var id = req.params.id;
    var deletedItem = notes.splice(id,1);
    //delete notes[id];
    console.log('deletedItem', deletedItem[0]);
    if (deletedItem.length !== 1) {
        return res.json('404', {error: '404', message: 'Could not delete.'});
    }
    return res.json(201);
};

/*
 * DELETE all notes.
 */
// app.delete('/notes', notes.deleteNotes ); // delete all notes
exports.deleteNotes = function(req, res){
    notes = [];
    res.send(200);
};