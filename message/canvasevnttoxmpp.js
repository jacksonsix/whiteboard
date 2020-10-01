
// get event out

function installListener(){

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
    

    document.addEventListener('localevt',function(evt){
	var msg = evt.detail;
	msgprocess.msghandler(msg);
    });


}


function publishEvt(msg){	
    // mhistory.push(msg);
    // count++;
    let sta = document.getElementById('status');
    if(sta.value ==='default'){
	if(msg.evt =='mousemove' || msg.evt ==='mouseup') {return; }
    }else if(sta.value ==='note'){
	if(msg.evt =='mousemove' || msg.evt ==='mouseup'){ return;  }
	msg.type = sta.value;
    }
    
    msg.jid = mplugin.jid;
    mplugin.send(sermsg(msg));
    custEvt(sermsg(msg));
   
}

function custEvt(msg){
    const event = new CustomEvent('localevt', { detail:'<body>$$$'+ msg + '</body>' });
    document.dispatchEvent(event);
}
   

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



var msgprocess ={
    installListener:installListener,
    msghandler: function msghandler(evt) {
	console.log('process: ' +evt);
	
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
            filep(msg);         
            break;
	case "page":
	    pagep(msg);
	case "many":
	    manyp(msg);
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
	
    },
    sermsg:sermsg,
    extractmsg:extractmsg,
    notep:null,
    interp:null,
    publishEvt:publishEvt,
    custEvt:custEvt
}

