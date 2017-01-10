//TO DO
//add queens 
//make sure [i-18] is never under 0 and [i+14] is never above 64 making them outside the tiles array

//GLOBAL VARIABLES\\
var turn="Red";
var color=0;
var clicked0=false;
var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var tiles = [];
var letters=["A","B","C","D","E","F","G","H"];
var Click={
	x: 0,
	y: 0,
	color: "",
	pieceColor: "",
	containsPiece: false,
	tile: ""
};
var draw = function (x, y, fillcolor, width,height, linewidth, strokestyle,piece,pieceColor) {
    //make tile
    context.beginPath();
    context.rect(x, y, width,height);
    context.fillStyle = fillcolor;
    context.fill();
    context.lineWidth = linewidth;
    context.strokeStyle = strokestyle;
    context.stroke();
    //make piece if specified
    if(piece){
    	//create piece at designated position
    	context.beginPath();
    	context.arc(x+35,y+35,30,0,2*Math.PI);
   		context.closePath();
   		//color in piece 	
   		if(pieceColor==="Red"){
   			//red
   			context.fillStyle = "#991f1d";
   		}else if(pieceColor==="Black"){
   			//black
   			context.fillStyle = "#000000";
   		}
   		//fill piece with color
   		context.fill();
   		
    	//line width of border
    	context.lineWidth="1";
   		//color of border
		if(pieceColor==="Red"){
			//black
   			context.fillStyle = "#000000";
    	}else if(pieceColor==="Black"){
    		//red
			context.fillStyle = "#991f1d";
   		}
   		//color in border
   		context.stroke();
			
			
    }
};
var Square = function(x, y, fillcolor,width,height,piece,pieceColor,queen) {
    this.left = x;
    this.top = y;
    this.right = x + width;
    this.bottom = y + height;
    this.color=fillcolor;
    this.containsPiece = piece;
    this.pieceColor =pieceColor;
    this.queen =queen;
};
var drawTile = function (x, y, fillcolor, width,height, linewidth, strokestyle,piece,pieceColor,queen,tiles) {
    draw(x, y, fillcolor, width,height, linewidth, strokestyle,piece,pieceColor);
    var tile = new Square(x, y, fillcolor,width,height,piece,pieceColor,queen);
    tiles.push(tile);  
};
var makeBoard=function(){
	 	for(var i=1;i<9;i++){
    	color+=1;
    	for(var j=0;j<8;j++){
    		if(color%2){
    			if(j<3){
					drawTile(350.5+71*j, 20+71*(i-1), "darkred", 70,70, 2, "#333333", true,"Black",false,tiles);
				}else if(j>4){
					drawTile(350.5+71*j, 20+71*(i-1), "darkred", 70,70, 2, "#333333", true,"Red",false,tiles);
				}else{
					drawTile(350.5+71*j, 20+71*(i-1), "darkred", 70,70, 2, "#333333", false,"Black",false,tiles);
				}
			}else{
			drawTile(350.5+71*j, 20+71*(i-1), "Black", 70,70, 2, "#333333", false,"Red",false,tiles);
			}
			color+=1;
		}
	}
}
var doubleJumpY=function(color,oppColor,i,direction,multiply){
	drawTile(tiles[i+(8*multiply+direction)*direction].left, tiles[i+(8*multiply+direction)*direction].top, tiles[i].color, 70,70, 2, "#333333", false,"",false,tiles);
	        //Single Jump
           	tiles[i+(8*multiply+direction)*direction].containsPiece=false;
           	tiles[i].containsPiece=true;
           	drawTile(tiles[i].left, tiles[i].top, tiles[i].color, 70,70, 2, "#333333", true,color,false,tiles);
           	drawTile(Click.x, Click.y, tiles[i].color, 70,70, 2, "#333333", false,tiles[i].pieceColor,false,tiles);
           	Click.tile.containsPiece=false;
           	tiles[i].pieceColor=color;
           	if(tiles[i+18*direction].containsPiece===false&&tiles[i+9*direction].containsPiece&&tiles[i+9*direction].pieceColor==="Black"&&(i-9)%8!==0&&(i-9)%8!==7){
           		var confirm=prompt("Do you want to double jump?\nWrite yes or no");
           		if(confirm==="yes"){
           						drawTile(tiles[i+9*direction].left, tiles[i+9*direction].top, tiles[i].color, 70,70, 2, "#333333", false,"",false,tiles);
           						drawTile(tiles[i].left, tiles[i].top, tiles[i].color, 70,70, 2, "#333333", false,"",false,tiles);
           						drawTile(tiles[i+18*direction].left, tiles[i+18*direction].top, tiles[i].color, 70,70, 2, "#333333", true,color,false,tiles);
           						tiles[i+9*direction].containsPiece=false;
           						tiles[i].containsPiece=false;
           						tiles[i+18*direction].containsPiece=true;
           						tiles[i+18*direction].pieceColor=color;
           						}
           						turn=oppColor;
           						//double jump
           					}else if(tiles[i-14*direction].containsPiece===false&&tiles[i-7*direction].containsPiece&&tiles[i-7*direction].pieceColor===oppColor&&(i+7)%8!==0&&(i+7)%8!==7){
           						var confirm=prompt("Do you want to double jump?\nWrite yes or no");
           						if(confirm==="yes"){
           						drawTile(tiles[i-7*direction].left, tiles[i-7*direction].top, tiles[i].color, 70,70, 2, "#333333", false,"",false,tiles);
           						drawTile(tiles[i].left, tiles[i].top, tiles[i].color, 70,70, 2, "#333333", false,"",false,tiles);
           						drawTile(tiles[i-14*direction].left, tiles[i-14*direction].top, tiles[i].color, 70,70, 2, "#333333", true,color,false,tiles);
           						tiles[i-7*direction].containsPiece=false;
           						tiles[i].containsPiece=false;
           						tiles[i-14*direction].containsPiece=true;
           						tiles[i-14*direction].pieceColor=color;
           						}
           						turn=oppColor;
           					}else{
								turn=oppColor;
           					}
}
var doubleJump=function(color,oppColor,i){
	if(color==="Red"){
		var direction=-1;
	}else{
		var direction=1;
	}
	if(Click.x-tiles[i].left===-142*direction){
        //second click is lower than first click	
        if(Click.y<tiles[i].top&&tiles[i+(9)*direction].containsPiece&&tiles[i+(-9)*direction].pieceColor===oppColor){
           	doubleJumpY(color,oppColor,i,direction,1);
           				//second click is higher than first click	
        }else if(Click.y>tiles[i].top&&tiles[i+(-8-direction)*direction].containsPiece&&tiles[i+(-8-direction)*direction].pieceColor===oppColor){
           	doubleJumpY(color,oppColor,i,direction,-1);
        }
    }
}
var secondClick=function(color,i){
	if(color==="Red"){
    var oppColor="Black";
    }else{
    var oppColor="Red";
    }
	if((Click.x-tiles[i].left===71||Click.x-tiles[i].left===-71)&&(Click.y-tiles[i].top===71||Click.y-tiles[i].top===-71)){
        drawTile(tiles[i].left, tiles[i].top, tiles[i].color, 70,70, 2, "#333333", true,color,false,tiles);
        drawTile(Click.x, Click.y, tiles[i].color, 70,70, 2, "#333333", false,tiles[i].pieceColor,false,tiles);
        Click.tile.containsPiece=false;
        tiles[i].containsPiece=true;
        tiles[i].pieceColor=color;
        if(color==="Red"){
        turn=oppColor;
    	}else{
    	turn=oppColor;
    	}
    }else{
    	doubleJump(color,oppColor,i);
    }
};
makeBoard();
context.font = "30px Arial";
context.fillText(turn+" Turn",560,640);
$('#myCanvas').click(function (e) {
    var clickedX = e.pageX - this.offsetLeft;
    var clickedY = e.pageY - this.offsetTop;
    for (var i = 0; i < 64; i++) {
		if (clickedX < tiles[i].right && clickedX > tiles[i].left && clickedY > tiles[i].top && clickedY < tiles[i].bottom&&clicked0===false) {
            //alert ("You clicked " + letters[i%8]+Math.ceil((i+1)/8));
            //alert("1");
  
            if(tiles[i].color==="darkred"&&tiles[i].containsPiece){
            	drawTile(tiles[i].left, tiles[i].top, tiles[i].color, 70,70, 2, "#000000", tiles[i].containsPiece,tiles[i].pieceColor,false,tiles);  
            	Click.color=tiles[i].color; 
          	  	Click.pieceColor=tiles[i].pieceColor; 
           		Click.x=tiles[i].left; 
           		Click.y=tiles[i].top; 
            	Click.containsPiece=tiles[i].containsPiece;
            	Click.tile=tiles[i];
            	clicked0=true;
            }


        }
    	else if (clickedX < tiles[i].right && clickedX > tiles[i].left && clickedY > tiles[i].top && clickedY < tiles[i].bottom&&clicked0===true) {
            drawTile(Click.x, Click.y, Click.color, 70,70, 2, "#333333", Click.containsPiece,Click.pieceColor,false,tiles);  
            if(tiles[i].color==="darkred"&&tiles[i].containsPiece===false){
            if(Click.pieceColor==="Red"&&turn==="Red"){
            	secondClick("Red",i);
        	}
        	else if(Click.pieceColor==="Black"&&turn==="Black"){
					secondClick("Black",i);
        	}
        	}
        	clicked0=false;
        }
    }
    context.clearRect(500,600,250,100);
    context.font = "30px Arial";
    context.fillStyle="#000000";
	context.fillText(turn+" Turn",560,640);	
});
