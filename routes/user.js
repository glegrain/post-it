/**
 * Module dependencies.
 */
var redis = require('redis');
/**
 * Module exports
 */
module.exports = User;
/**
 * Create client.
 */
var client = redis.createClient();

/**
 * User model
 */
 function User(id, name) {
    this.id = id;
    this.name = name;
    //this.notes = [];
 }

User.prototype.getNotes = function(fn) {
    // TODO
    // get notes for users
};

User.prototype.addNote = function(id, fn) {
    // TODO
    // save note id
};

User.prototype.save = function (fn) {
    if (!this.id) {
    this.id = String(Math.random()).substr(3);
  }

    // TODO
};



/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.send("Not yet implemented.");
};