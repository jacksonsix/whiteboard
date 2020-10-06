
// get event out

// build high level event from primes

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
	    msg.evt ='stlight'
	    publishEvt(msg);
	}else if(status ==='erase'){
	    msg.type = 'eras';
	    msg.evt ='sterase';
	    publishEvt(msg);
	}       

    });

    myPics.addEventListener('mousemove', e => {	
	msg = {
	    'evt':'mousemove'
	    ,'x': e.offsetX 
	    ,'y':e.offsetY
	};
	let status = sta.value;
	if(status ==='highlight' && stateObject.drawing){
	    msg.type = 'mark';
	    msg.evt ='lighto';
	    publishEvt(msg);
	}else if(status ==='erase') {
	    msg.type = 'eras';
	    msg.evt = 'eraseto';
	    publishEvt(msg);
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
	    msg.evt ='newnote'
	    publishEvt(msg);
	    
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
	    msg.evt = 'endlight';
	    publishEvt(msg);
	}else if(status ==='erase'){
	    msg.type ='eras';
	    msg.evt = 'enderase'
	}       
    });
    

    document.addEventListener('localevt',function(evt){
	var msg = evt.detail;
	msgprocess.msghandler(msg);
    });


}


function publishEvt(msg){	
    
    msg.jid = mplugin.jid;
    if(msg.type ==='mark' && msg.evt ==='lighto'){
	// make small message for remote
	var sm ={
	    x:msg.x,
	    y:msg.y	  
	};
	msgprocess.mhistory.push(sermsg(sm));
	custEvt(sermsg(msg));
    }else if(msg.type ==='eras' && msg.evt ==='eraseto'){
	var sm ={
	    x:msg.x,
	    y:msg.y	  
	};
	msgprocess.mhistory.push(sermsg(sm));
	custEvt(sermsg(msg));
	
    }else if(msg.type ==='mark' && msg.evt ==='endlight'){
	var res = msgprocess.mhistory.join('\n');
	var mmsg ={
	    type:'many',
	    records:res,
	    jid:msg.jid,
	    evt: 'lighto',
	    evtype: 'mark'
	};

	mplugin.send(sermsg(mmsg));
	msgprocess.no = 0;
	msgprocess.mhistory =[];
	mplugin.send(sermsg(msg));
	custEvt(sermsg(msg));
    }else if(msg.type ==='eras' && msg.evt ==='enderase'){
	var res = msgprocess.mhistory.join('\n');
	var mmsg ={
	    type:'many',
	    records: res,
	    jid: msg.jid,
	    evt: 'eraseto',
	    evtype: 'eras'
	};

	mplugin.send(sermsg(mmsg));
	msgprocess.no = 0;
	msgprocess.mhistory =[];
	mplugin.send(sermsg(msg));
	custEvt(sermsg(msg));
    }
    else{
	mplugin.send(sermsg(msg));
	custEvt(sermsg(msg));
    } 
    
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
    mhistory:[],
    no:0
}

