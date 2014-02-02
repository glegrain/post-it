

    function showPost(postIt) {
        console.log('called showPost');
        //var div = $('<div>').addClass('post-it').attr('id',data[i].id_post).appendTo("#container");
        // $('#container').append('<div id=' + data[i].id_post + '></div>');
    }

    function showPosts(postIts) {
        console.log('called showPosts');
        console.log(postIts);
        //$.each(postIts, showPost(i));
    }

    function getAll() {
        $.getJSON('api/index.php?controller=post&action=readPost', {} )
        .done(function( data ) {
            console.log("DSD");
            //TODO:loading gif
            $.each(data.data, function(index, item) {
                console.log(item.id_post);
                //$('#' + post.id_post ).append('<h1></h1><p></p>' ).appendTo('#container');
                $('#container').append('<div id=' + item.id_post + ' class="post-it" style=" left: ' + item.x + 'px; top: ' + item.y+ 'px; background-color: #' + dechex(item.color) + ';"><h1>' + item.title + '</h1><p>' + item.message + '</p></div>');

            });
        });
    }

$(document).ready(function() {
    //getAll();

});

//TODO: implement this in the API
function dechex (number) {
  // http://kevin.vanzonneveld.net
  // +   original by: Philippe Baumann
  // +   bugfixed by: Onno Marsman
  // +   improved by: http://stackoverflow.com/questions/57803/how-to-convert-decimal-to-hex-in-javascript
  // +   input by: pilus
  // *     example 1: dechex(10);
  // *     returns 1: 'a'
  // *     example 2: dechex(47);
  // *     returns 2: '2f'
  // *     example 3: dechex(-1415723993);
  // *     returns 3: 'ab9dc427'
  if (number < 0) {
    number = 0xFFFFFFFF + number + 1;
  }
  return parseInt(number, 10).toString(16);
}