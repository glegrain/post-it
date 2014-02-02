// app.get('/notes', notes.getNotes); // list notes
// app.post('/notes', function(req,res){throw new Error(); }); // error
// app.delete('/notes', notes.deleteNotes ); // delete all notes
// app.get('/notes/:id', notes.getNote);
// app.put('/notes/:id', notes.putNote); // if exist update note, else error
// app.post('/notes/:i', notes.postNote); // creates a new note
// app.delete('/notes/:id', notes.deleteNote); // delete note



var notes = [
        // {
        //     //"href": "http://postit.herokuapp.com/notes/1"
        //     id: 0,
        //     title: 'My first note',
        //     message: 'Lorem ipsum',
        //     x: 300,
        //     y: 300,
        //     color: '#ff802f'
        // },
        // {
        //     //"href": "http://postit.herokuapp.com/notes/1"
        //     id: 1,
        //     title: 'My second note',
        //     message: 'Lorem ipsum',
        //     x: 300,
        //     y: 500,
        //     color: '#ccff66'
        // }
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