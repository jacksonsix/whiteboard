// dup on another canvas
// read in mhistory
let dup='';
let dupcontext='';
let dupx=0;
let dupy=0;

function interp(cmd){
        dup = document.getElementById("canvas");
	dupcontext = dup.getContext('2d');
	if(cmd.type =='mousedown'){
		dupx = cmd.x;
		dupy = cmd.y;	
              	
	}else if(cmd.action =='drawline'){
		drawLine(dupcontext, dupx, dupy, cmd.parameters[0], cmd.parameters[1]);

		dupx = cmd.parameters[0];
		dupy = cmd.parameters[1];
	}else if(cmd.type =='mouseup'){
              
	}else{
	  //
	}

}

function drawLine(context, x1, y1, x2, y2) {
  context.beginPath();
  context.strokeStyle = 'black';
  context.lineWidth = 1;
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
  context.closePath();
}
