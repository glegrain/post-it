var mongoose = require('mongoose');

// Define a post-it note schema.
// Each schema maps to a MongoDB collection and defines the shape of the
// documents within that collection.
var NoteSchema = new mongoose.Schema({
    title: String,
    message: String,
    x: String,
    y: String,
    color: String
});

// Compile the schema into a Model.
// Models are fancy constructors compiled from our Schema definitions.
// Instances of these models represent documents which can be saved and
// retrieved from our database. All document creation and retrieval from the
// database is handled by these models.
module.exports = mongoose.model('Note', NoteSchema);


