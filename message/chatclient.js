"use strict";
var connection = null;
var clientID = 0;

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
        break;
      case "username":
        text = "<b>User <em>" + msg.name + "</em> signed in at " + timeStr + "</b><br>";
        break;
      case "message":
        text = "(" + timeStr + ") <b>" + msg.name + "</b>: " + msg.text + "<br>";
        break;
      case "command":
        text = "(" + timeStr + ") <b>" + msg.name + "</b>: " + msg.text + "<br>";
        interp(msg);
        break;
      case "load":
        text = "(" + timeStr + ") <b>" + msg.name + "</b>: " + msg.text + "<br>";
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
    id: clientID,
    name: "a",
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
    type: "command",
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
  var msg = {
    text: 'blank',
    type: "command",
    id: clientID,
    name: "a",
    date: Date.now()
  };
  msg.action = command.action;
  msg.parameters = command.parameters;

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





