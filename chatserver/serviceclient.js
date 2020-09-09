"use strict";
var WebSocketCient = require('websocket').client;
var connection = null;
var clientID = 0;
var self = this;

function setUsername(uname) {
  console.log("***SETUSERNAME");
  var msg = {
    name: uname,
    date: Date.now(),
    id: clientID,
    type: "username"
  };
  self.connection.sendUTF(JSON.stringify(msg));
}

function connect(protocol,hostname) {
  var serverUrl;
  var scheme = "ws";

  // If this is an HTTPS connection, we have to use a secure WebSocket
  // connection too, so add another "s" to the scheme.

  if (protocol === "https:") {
    scheme += "s";
  }

  serverUrl = scheme + "://" + hostname + ":6502";

  var client = new WebSocketCient();
  client.connect(serverUrl, 'json');
  client.on('connect',function(connection){
     self.connection = connection;
     console.log("***CREATED WEBSOCKET");
     console.log(serverUrl);
     connection.on('error', function(error) {
	console.log("Connection Error: " + error.toString());
     });
     connection.on('close', function() {
	console.log('Connection Closed');
     });
    connection.on('message', function(evt) {
    console.log("***ONMESSAGE");
    console.log(evt);
    var text = "";
    var msg = JSON.parse(evt.utf8Data);
    var time = new Date(msg.date);
    var timeStr = time.toLocaleTimeString();
    //client side receive msg
    switch(msg.type) {
      case "id":
        clientID = msg.id;
        setUsername('fileServer');
        console.log('set username as fileServer');
        break;
      case "username":
        text = "<b>User <em>" + msg.name + "</em> signed in at " + timeStr + "</b><br>";
        break;
      case "message":
        text = "(" + timeStr + ") <b>" + msg.name + "</b>: " + msg.text + "<br>";
        break;
      case "command":
        text = "";
        //interp(msg);
        break;
      case "load":
	//loadwork(msg);
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
        break;
      default:
	break;
    }

    if (text.length > 0 ) {
      //writer.write(text);
      console.log(text);
    }
  });
  });

 
}

function send(stext) {
  console.log("***SEND");
  var msg = {
    text: stext,
    type: "message",
    id: clientID,
    date: Date.now()
  };
  console.log(connection);
  self.connection.sendUTF(JSON.stringify(msg)); 
}


module.exports = {
	'send':send,
	'connect':connect
	
}
