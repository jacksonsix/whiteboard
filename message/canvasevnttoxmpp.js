
// get event out

const myPics = document.getElementById('canvas');

myPics.addEventListener('mousedown', e => {

    msg = {
	'evt':'mousedown'
	,'x':e.offsetX 
	,'y':e.offsetY
    };
    
    publishEvt(msg);
});

myPics.addEventListener('mousemove', e => {
    
    msg = {
	'evt':'mousemove'
	,'x': e.offsetX 
	,'y':e.offsetY
    };	
    publishEvt(msg);	
    
});


myPics.addEventListener('click', e => {
    
    msg = {
	   'evt':'click'
	   ,'x':e.offsetX 
	   ,'y':e.offsetY
	  };	
    publishEvt(msg);
});

window.addEventListener('mouseup', e => {
    
    msg = {
	'evt':'mouseup'
	,'x':e.offsetX 
	,'y':e.offsetY
    };	
    publishEvt(msg);
});

///////////////////////////////////////////////////////////////////////////////////////





///////////////////////////////////////////////////////////////////////////////////////

function sermsg(msg){
   
    return JSON.stringify(msg);
}
function extractmsg(xml){
    var start = xml.indexOf('>') + 1;
    var end = xml.indexOf('</body>');
    var msg = xml.substring(start,end);
    return msg.substring(3);
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
    var info = extractmsg(evt);
    var msg =JSON.parse(info);
   
    switch(msg.type) {
    case "mark":
	break;
    case "note":
	notep(msg,'canvas');
	break;
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



