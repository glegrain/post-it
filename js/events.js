
var scale = 1; //Original scaling
var positionX = 0; //TranlationX step
var positionY = 0; //TranlationY step

function cssChange() {
	$('#container').css("-webkit-transform","translate("+positionX+"px, "+positionY+"px) Scale("+scale+")");
	$('#container').css("-moz-transform","translate("+positionX+"px, "+positionY+"px) Scale("+scale+")");
	$('#container').css("-o-transform","translate("+positionX+"px, "+positionY+"px) Scale("+scale+")");
	$('#container').css("transform","translate("+positionX+"px, "+positionY+"px) Scale("+scale+")");
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
		}); //TODO: Zooming, Create,Edit (with overley to mask other posts),Delete
	})
	.live('keydown',function(e){  //Zoom out function
		if (e.keyCode == '80'){  //trigger on "p"
			scale+=0.2;
		cssChange();
	}
	
})
	.live('keydown',function(e){  //Zoom out function
		if (e.keyCode == '79' && scale > 0.2){ //trigger on "o"
			scale-=0.2;
		cssChange();
		
	}
	
})
	.live('keydown',function(e){  //translationX function
		if (e.keyCode == '39'){  //trigger on "right arrow"
			cssChange();
		positionX+=100;
	}
})
	.live('keydown',function(e){  //translationX function
		if (e.keyCode == '37'){  //trigger on "left arrow"
			positionX-=100;
		cssChange();
	}
})
		.live('keydown',function(e){  //translationY function
		if (e.keyCode == '40'){  //trigger on "down arrow"
			cssChange();
		positionY+=100;
	}
})
	.live('keydown',function(e){  //translationY function
		if (e.keyCode == '38'){  //trigger on "up arrow	"
			positionY-=100;
		cssChange();
	}
});