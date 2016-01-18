
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
		if (e.keyCode == '80' && !$(".edit").is(":focus")){  //trigger on "p"
			zoomIn();
	}

})
	.live('keydown',function(e){  //Zoom out function
		if (e.keyCode == '79' && scale > 0.2 && !$(".edit").is(":focus")){ //trigger on "o"
			zoomOut();
	}

})
	.live('keydown',function(e){  //translationX function
		if (e.keyCode == '39' && !$(".edit").is(":focus")){  //trigger on "right arrow"
			moveRight();
	}
})
	.live('keydown',function(e){  //translationX function
		if (e.keyCode == '37' && !$(".edit").is(":focus")){  //trigger on "left arrow"
			moveLeft();
	}
})
		.live('keydown',function(e){  //translationY function
		if (e.keyCode == '40' && !$(".edit").is(":focus")){  //trigger on "down arrow"
			moveDown();
	}
})
	.live('keydown',function(e){  //translationY function
		if (e.keyCode == '38' && !$(".edit").is(":focus")){  //trigger on "up arrow	"
			moveUp();
	}
	//-----End Nav keyboard events---/

});