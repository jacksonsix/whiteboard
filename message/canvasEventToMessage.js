// get event out

let isDrawing = false;
let x = 0;
let y = 0; 
const myPics = document.getElementById('canvas');

myPics.addEventListener('mousedown', e => {
  x = e.offsetX;
  y = e.offsetY;
  msg = {'type':'mousedown'
	,'x':x 
	,'y':y
  };
  isDrawing = true;
  publishEvt(msg);
});

myPics.addEventListener('mousemove', e => {
  if (isDrawing === true) {
    //drawLine(context, x, y, e.offsetX, e.offsetY);
    x = e.offsetX;
    y = e.offsetY;
    msg = {'type':'mousemove'
	,'x':x 
	,'y':y
	};	
    publishEvt(msg);	
  }
});

window.addEventListener('mouseup', e => {
    isDrawing = false;
    mhistory.forEach( function(msg){
       let m = msg.type +' x:'+ msg.x + 'y:' + msg.y +':' + count;	
	//console.log(m);
	});	
	
	mhistory.forEach(function(e){
                // don't direct interpret , receive msg and then interpret message.
		//interp(e);
                // send out here. will change later
	        //output command
		var cmd = {
		action:'drawline',
		parameters:[e.x, e.y]
		};
		sendCommand(cmd);
                //
	});
});


let count = 0;
let mhistory =[];
function publishEvt(msg){	
	mhistory.push(msg);
	count++;
   
}





