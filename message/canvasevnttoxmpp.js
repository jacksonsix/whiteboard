
function sermsg(msg){
    var text='';
    return text;
}
function dsermsg(xml){
    var msg={};
    return msg;
}
function loadpic(){
  var msg = {
    type: "pict",
    text:"load pic"
  };
  connection.send(sermsg(msg));
}
function msghandler(evt) {
    var text = "";
    var msg = dsermsg(evt.data);
     
    switch(msg.type) {
    case "file":
        text = "(" + timeStr + ") <b>" + msg.name + "</b>: " + msg.text + "<br>";
       
           let cid = msg.text.substring(msg.text.indexOf(":") + 1);
           let userid = window.sessionStorage.getItem('cid');
           if(cid === userid){
             loadpic();
           }
        break;
    case "load":
	loadwork(msg);
	break;
    case "comm":
	interp(msg);
        break;
    default:
	break;

    if (text.length) {
      f.write(text);
    }
  };
 
}

function send() {
  
  var msg = {
    text: document.getElementById("text").value,
    type: "message",
    id: clientID,
    date: Date.now()
  };
  connection.send(JSON.stringify(msg));
 
}

function sendmouse(evttxt) {
  console.log("***SEND");
  var msg = {
    text: evttxt,
    type: "message",
    subtype:"command",
    id: clientID,
    name: clientID,
    date: Date.now()
  };
  if(connection){
	    connection.send(JSON.stringify(msg));
  }
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

function makeCommand(status,evt){
 	let cmd ={
	action:'draw',
	parameters:[23,15]
	
	};
	return cmd;
}



function sendCommand(command) {
  //console.log("***SEND");
  var msg = command;
   msg.text = 'blank';
   msg.type='message';
   msg.subtype = 'command';
   msg.id = clientID;
   msg['name'] = clientID;
   msg.date = Date.now();

  if(connection){
    connection.send(JSON.stringify(msg));
  }
}


// this serve filter.  check status, if intested, then make command.  and then send to back server
function filterEventType(event) {
  console.log(event.type)
  let stat = checkStatus();    // want to make command ?
  let bmakeCommand = machineCommand(stat);
  let bchangeStatus = true;
  if( bmakeCommand){
	  let command = makeCommand(event);
          if(event.type==='keydown')
             sendCommand(command);
	  //sendmouse(event.type)
  }else{  // no further process, discard
    
  }		  
}

function loadwork(msg){
	   let cs =  msg.text.split("\n");
	   cs.pop();
	   cs.forEach(line => {loadinterp(line)});
}



