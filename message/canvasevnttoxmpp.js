
// get event out

let isDrawing = false;
let x = 0;
let y = 0; 
const myPics = document.getElementById('canvas');

myPics.addEventListener('mousedown', e => {
  x = e.offsetX;
  y = e.offsetY;
    msg = {'type':'draw',
	   'evt':'mousedown'
	,'x':x 
	,'y':y
  };
  isDrawing = true;
  publishEvt(msg);
});

myPics.addEventListener('mousemove', e => {
  if (isDrawing === true) {
    x = e.offsetX;
    y = e.offsetY;
      msg = {'type':'draw',
	     'evt':'mousemove'
	,'x':x 
	,'y':y
	};	
    publishEvt(msg);	
  }
});

window.addEventListener('mouseup', e => {
    isDrawing = false;
    x = e.offsetX;
    y = e.offsetY;
    msg = {'type':'draw',
	'evt':'mouseup'
	,'x':x 
	,'y':y
	};	
    publishEvt(msg);
});



///////////////////////////////////////////////////////////////////////////////////////





///////////////////////////////////////////////////////////////////////////////////////

function sermsg(msg){
    var text='';
    for (var name in msg) {
	if (msg.hasOwnProperty(name)) {
	    text += msg[name] +',';
        }
    }
    return text.substring(0,text.length-1);
}
function dsermsg(xml){
    var start = xml.indexOf('>') + 1;
    var end = xml.indexOf('</body>');
    var msg = xml.substring(start,end);
    //msg= msg.split(',');
    return msg;
}
function loadpic(){
  var msg = {
    type: "pict",
    text:"load pic"
  };
  msger.send(sermsg(msg));
}
function msghandler(evt) {
    console.log(evt);
    var text = "";
    var info = dsermsg(evt);
    var msg ={};
    msg.type = info.substring(3,7);
    var t = info.substring(8).split(',');
    msg.evt = t[0];
    msg.x = t[1];
    msg.y = t[2];
    switch(msg.type) {
    case "file":
           //let cid = msg.text.substring(msg.text.indexOf(":") + 1);
           //let userid = window.sessionStorage.getItem('cid');
           //if(cid === userid){
            // loadpic();
           //}
        break;
    case "load":
	loadwork(msg);
	break;
    case "draw":
	interp(msg);
        break;
    default:
	break;

    if (text.length) {
      f.write(text);
    }
  };
 
}


function load(){
  console.log("***SEND");
  var msg = {
    text: "load",
    subtype: "load",
    id: clientID,
    date: Date.now()
  };
  if(connection){
    connection.send(JSON.stringify(msg));
  }	
}

function machineCommand(){
	return true;
}

function loadwork(msg){
	   let cs =  msg.text.split("\n");
	   cs.pop();
	   cs.forEach(line => {loadinterp(line)});
}



