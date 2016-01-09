// //
// // using $http
// //
// var ngApp = angular.module('MyApp', []);
// ngApp.controller('NotesCtrl', function($scope, $http) {
//   $http.get('/notes').
//   success(function(data, status, headers, config) {
//     console.log(data);
//     $scope.notes = data.items;
//   })
//   .error(function(data, status, headers, config) {
//     console.log("ERROR");
//   });
// });


//
// Using $ressource
//


var ngApp = angular.module('myApp', ['ngResource']);

// declare a dependency on $resource
ngApp.factory('Note', function($resource) {
  // call the $resource() function
  // default query expects an array but our API returns { items: [] }
  // Here we are also creating an 'update' method
  return $resource('/notes/:id', null, {
    'query': {isArray: false},
    'update': { method:'PUT' }
  });
});
// the returned resource Object will provide us with some methods
// get(), query(), save(), remove(), delete()

ngApp.controller('NotesCtrl', function($scope, Note) {

  // query() all entries
  var response = Note.query(function() {
    $scope.notes = response.items;
  });

  $scope.updateNote = function(id) {
    Note.update({'id': id}, $scope.notes[id]);
  };

  $scope.deleteNote = function(id) {
    // remove note from view
    $scope.notes.splice(id, 1);
    // remove note from API
    Note.delete({'id': id});
  };

  $scope.addNote = function() {
    // NOTE: we can call new on Note because it is a factory service
    myNewNote = new Note();
    myNewNote.title = 'Super cool!';
    Note.save(myNewNote, function(res) {
      // done
      $scope.notes.push(res);
    });
  }
});
