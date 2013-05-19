
var scale = 1; //Original scaling
var positionX = 0; //TranlationX step
var positionY = 0; //TranlationY step

function cssChange() {
	$('#container').css("-webkit-transform","translate("+positionX+"px, "+positionY+"px) Scale("+scale+")");
	$('#container').css("-moz-transform","translate("+positionX+"px, "+positionY+"px) Scale("+scale+")");
	$('#container').css("-o-transform","translate("+positionX+"px, "+positionY+"px) Scale("+scale+")");
	$('#container').css("transform","translate("+positionX+"px, "+positionY+"px) Scale("+scale+")");
}

//Nav functions
function zoomIn() {
	scale+=0.2;
	cssChange();
}
function zoomOut() {
	scale-=0.2;
	cssChange();
}
function moveRight(){
	cssChange();
	positionX+=100;
}
function moveLeft(){
	positionX-=100;
	cssChange();
}

function moveUp(){
	positionY-=100;
	cssChange();
}
function moveDown(){
	positionY+=100;
	cssChange();
}

$(document).ready(function() {
	$( ".post-it" )
	.draggable() //Make the div draggable
	.resizable({  //FIXME
		maxHeight: 350,
		maxWidth: 350,
		minHeight: 150,
		minWidth: 150
	})
	.mousemove(function(){		//Show coords while moving the div, for debug
		var coord = $(this).position();
		//$(this).children("p:last").text("x="+coord.left+" y="+coord.top);
	})
	.mouseup(function(){
		//$(this).css('z-index','1001');//TODO: $(.post-it:last).css('z-ndex')+1

		//Update position in db by sending a JSON to server
		var coords =[];
		var coord = $(this).position();
		var currentItem = $(this).attr('id').replace(/\D/g,'');

		item = {postId: currentItem, x: coord.left, y:coord.top};
		coords.push(item);
		var order = {coords: coords};
		//alert($.toJSON(order));
		//alert(order[c]);
		$.ajax({
			url: 'updatecoords.php',
			type: "POST",
			data:  "data="+$.toJSON(order),
				//contentType:"text/plain; charset=utf-8",
				//dataType:"json",
				success: function(response){
					if(response ==	0) //If no error
						$("#respond").html('<div class="success">X and Y Coordinates Saved!</div>').hide().fadeIn(1000);
					setTimeout(function(){ $('#respond').fadeOut(1000); }, 2000);
				}
			});
	}); //TODO:Create,Edit (with overley to mask other posts/modal window type/or flip effect),Delete

	$(".plus-round-big").bind('click',function(){ //TODO: clean up to proper JSON requests, and results
		$.ajax({
			url: '/api/index.php',
			type: "GET",
			data: "controller=post&action=createPost&title=website&message=adhabdkhajbdhjkasd",
			cache: false,
			success: function(responseText){
				//alert('new post added !!');
				$('#container').fadeIn().load("viewPosts.php");
			}
		})
	});

	//-----Nav icon events---/
	$(".plus").live('click',function(e){
		zoomIn();
	});
	$(".minus").live('click',function(e){
		zoomOut();
	});
	$(".right").live('click',function(e){
		moveRight();
	});
	$(".left").live('click',function(e){
		moveLeft();
	});
	
})

	//-----Nav keyborad events---/
	.live('keydown',function(e){  //Zoom out function
		if (e.keyCode == '80'){  //trigger on "p"
			zoomIn();
	}

})
	.live('keydown',function(e){  //Zoom out function
		if (e.keyCode == '79' && scale > 0.2){ //trigger on "o"
			zoomOut();
	}
	
})
	.live('keydown',function(e){  //translationX function
		if (e.keyCode == '39'){  //trigger on "right arrow"
			moveRight();
	}
})
	.live('keydown',function(e){  //translationX function
		if (e.keyCode == '37'){  //trigger on "left arrow"
			moveLeft();
	}
})
		.live('keydown',function(e){  //translationY function
		if (e.keyCode == '40'){  //trigger on "down arrow"
			moveDown();
	}
})
	.live('keydown',function(e){  //translationY function
		if (e.keyCode == '38'){  //trigger on "up arrow	"
			moveUp();
	}
	//-----End Nav keyboard events---/
	
});