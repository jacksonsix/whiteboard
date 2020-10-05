
// get event out

function installListener(){

    const myPics = document.getElementById('canvas');
    let sta = document.getElementById('status');
    myPics.addEventListener('mousedown', e => {

	msg = {
	    'evt':'mousedown'
	    ,'x':e.offsetX 
	    ,'y':e.offsetY
	};

	let status = sta.value;
	if(status ==='highlight'){
	    msg.type = 'mark';
	    publishEvt(msg);
	}else{

	}       

    });

    myPics.addEventListener('mousemove', e => {	
	msg = {
	    'evt':'mousemove'
	    ,'x': e.offsetX 
	    ,'y':e.offsetY
	};
	let status = sta.value;
	if(status ==='highlight'){
	    msg.type = 'mark';
	    publishEvt(msg);
	}else{

	}       
    });


    myPics.addEventListener('click', e => {
	
	msg = {
	    'evt':'click'
	    ,'x':e.offsetX 
	    ,'y':e.offsetY
	};
	let status = sta.value;
	if(status ==='note')
	{
	    msg.type = 'note';
	    publishEvt(msg);
	    
	}else{

	}       
	

    });

    window.addEventListener('mouseup', e => {	
	msg = {
	    'evt':'mouseup'
	    ,'x':e.offsetX 
	    ,'y':e.offsetY
	};	
	let status = sta.value;
	if(status ==='highlight'){
	    msg.type = 'mark';
	    publishEvt(msg);
	}else{

	}       
    });
    

    document.addEventListener('localevt',function(evt){
	var msg = evt.detail;
	msgprocess.msghandler(msg);
    });


}


function publishEvt(msg){	
    
    msg.jid = mplugin.jid;
    if(msg.type ==='mark' && msg.evt ==='mousemove'){
	if(msgprocess.mhistory.length >=100){
	    mmsg ={
		type:'many',
		records:msgprocess.mhistory
	    };
	    mplugin.send(sermsg(mmsg));
	    msgprocess.mhistory =[];
	}else{
	    msgprocess.mhistory.push(msg);
	}
	custEvt(sermsg(msg));
    }else{
	mplugin.send(sermsg(msg));
	custEvt(sermsg(msg));
    } 
    
}

function custEvt(msg){
    const event = new CustomEvent('localevt', { detail:'<body>$$$'+ msg + '</body>' });
    document.dispatchEvent(event);
}

function clearMsgQueue(){
    if(msgprocess.mhistory.length > 0){
	mmsg ={
	    type:'many',
	    records:msgprocess.mhistory
	};
	mplugin.send(sermsg(mmsg));
	msgprocess.mhistory =[];
    }
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
	    markp(msg,'canvas');
	    break;
	case "note":
	    notep(msg,'canvas');
	    break;
	case "file":      
            filep(msg);         
            break;
	case "page":
	    pagep(msg);
	    break;
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
    custEvt:custEvt,
    clearMsgQueue:clearMsgQueue,
    mhistory:[]
}

