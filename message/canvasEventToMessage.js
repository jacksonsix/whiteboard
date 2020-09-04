// get event out

let isDrawing = false;
let x = 0;
let y = 0; 
const myPics = document.getElementById('canvas');

myPics.addEventListener('mousedown', e => {
  x = e.offsetX;
  y = e.offsetY;
  msg = {'evttype':'mousedown'
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
    msg = {'evttype':'mousemove'
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

	});	
	
	mhistory.forEach(function(e){
                // don't direct interpret , receive msg and then interpret message.
		//interp(e);
                // send out here. will change later
	        //output command

                e.action ='drawline';
		e.parameters= [e.x,e.y];
		//sendCommand(e);
                //
	});
});


let count = 0;
let mhistory =[];
function publishEvt(msg){	
	mhistory.push(msg);
	count++;
        msg.action = 'drawline';
        msg.parameters = [msg.x, msg.y];
	sendCommand(msg);
   
}





