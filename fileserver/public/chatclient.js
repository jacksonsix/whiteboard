"use strict";
var connection = null;
var clientID = 0;

function getCid(){
   return clientID;
}

function setUsername() {
  console.log("***SETUSERNAME");
  var msg = {
    name: document.getElementById("name").value,
    date: Date.now(),
    id: clientID,
    type: "username"
  };
  connection.send(JSON.stringify(msg));
}


function loadpic(){
  var msg = {
    name: document.getElementById("name").value,
    date: Date.now(),
    id: clientID,
    type: "message",
    text:"load pic"
  };
  connection.send(JSON.stringify(msg));
}
function connect() {
  var serverUrl;
  var scheme = "ws";

  // If this is an HTTPS connection, we have to use a secure WebSocket
  // connection too, so add another "s" to the scheme.

  if (document.location.protocol === "https:") {
    scheme += "s";
  }

  serverUrl = scheme + "://" + document.location.hostname + ":6502";

  connection = new WebSocket(serverUrl, "json");
  console.log("***CREATED WEBSOCKET");

  connection.onopen = function(evt) {
    console.log("***ONOPEN");
    document.getElementById("text").disabled = false;
    document.getElementById("send").disabled = false;
  };
  console.log("***CREATED ONOPEN");

  connection.onmessage = function(evt) {
    console.log("***ONMESSAGE");
    var f = document.getElementById("chatbox").contentDocument;
    var text = "";
    var msg = JSON.parse(evt.data);
    console.log("Message received: ");
    //console.dir(msg);
    var time = new Date(msg.date);
    var timeStr = time.toLocaleTimeString();

    switch(msg.type) {
      case "id":
        clientID = msg.id;
        setUsername();
        console.log('first cid is ' + clientID);
        window.sessionStorage.setItem('cid',clientID);
        break;
      case "username":
        text = "<b>User <em>" + msg.name + "</em> signed in at " + timeStr + "</b><br>";
        break;
      case "message":
        text = "(" + timeStr + ") <b>" + msg.name + "</b>: " + msg.text + "<br>";
        if(msg.name ==="fileServer"){
           let cid = msg.text.substring(msg.text.indexOf(":") + 1);
           let userid = window.sessionStorage.getItem('cid');
           if(cid === userid){
             loadpic();
           }
        }
        if(msg.subtype && msg.subtype==='load'){
	  loadwork(msg);
        }
        if(msg.subtype==='command'){
	   interp(msg);
	}
        break;
      case "rejectusername":
        text = "<b>Your username has been set to <em>" + msg.name + "</em> because the name you chose is in use.</b><br>";
        break;
      case "userlist":
        var ul = "";
        var i;

        for (i=0; i < msg.users.length; i++) {
          ul += msg.users[i] + "<br>";
        }
        document.getElementById("userlistbox").innerHTML = ul;
        break;
    }

    if (text.length) {
      f.write(text);
      //document.getElementById("chatbox").contentWindow.scrollByPages(1);
    }
  };
  console.log("***CREATED ONMESSAGE");
}

function send() {
  console.log("***SEND");
  var msg = {
    text: document.getElementById("text").value,
    type: "message",
    id: clientID,
    date: Date.now()
  };
  connection.send(JSON.stringify(msg));
  document.getElementById("text").value = "";
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

  //document.getElementById("text").value = "";
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
function handleKey(evt) {
  if (evt.keyCode === 13 || evt.keyCode === 14) {
    if (!document.getElementById("send").disabled) {
      send();
    }
  }
}


function checkStatus(){
  return 'draw';
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

  //document.getElementById("text").value = "";
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
	if(msg.type ==='load'){
	  
	   let cs =  msg.text.split("\n");
	   cs.pop();
	   cs.forEach(line => {loadinterp(line)});

	}
}



