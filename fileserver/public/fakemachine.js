// dup on another canvas
// read in mhistory
let dup='';
let dupcontext='';

let users={};

var machine={};
machine.createnote = null;
machine.write = null;
machine.notep = notep;
machine.filep = filep;
machine.pagep = pagep;
machine.book ='';
machine.pagenum = 1;

function manyp(cmd){
    
    var rs = [];
    if(typeof(cmd.records) ==='undefined'){
	return;
    }else if(typeof(cmd.records) =='string'){
	rs = cmd.records.split('\n');
    }else{
	rs = cmd.records;
    }
    
    rs.forEach(r =>{
	if(r.length < 5) return;
	if(cmd.history && cmd.history == true){
	    var obj = JSON.parse(r);
	    obj.history = true;
	    custEvt( msgprocess.sermsg(obj));
	    
	}else{   
	    custEvt(r);	    
	}
	
    });
    
}


function markp(cmd,canvasname){
    if(cmd.evt =='mousedown'){
	stateObject.drawing = true;
	var xy ={
	    x:cmd.x,
	    y:cmd.y
	};
	machine.updateUserInfo(cmd.jid,xy);
    }else if(cmd.evt ==='mouseup'){
	stateObject.drawing = false;
	//clear out the msg
	//machine.clearMsgQueue();
	
    }else if(cmd.evt ==='mousemove'){
	if(stateObject.drawing){
	    //draw line here
	    machine.highlight(cmd,canvasname);
	}
    }else{

    }
}

function pagep(cmd){
    if(cmd.evt ==='page'){	  	
	pdfloader.viewpage(cmd.num);
	// clear current page note
	var cs =[];
	var notes = document.getElementsByClassName('user');
	for(var i=0;i< notes.length;i++){
	    cs.push(notes[i]);	    
	}
        cs.forEach(n =>{ n.parentNode.removeChild(n); });
	// update page text
	var ptext = document.getElementById('page');
	ptext.value = cmd.num;
	// load all notes on this page
	machine.pagenum = cmd.num;
	var msg ={
	    type: 'note',
	    evt: 'loadnote',
	    book: machine.book,
	    pagenum: machine.pagenum
	};
	publishEvt(msg);

    }
}

function filep(cmd){
    if(cmd.evt ==='list'){
	$.get( uploader.baseUrl + "list", function( data ) {	
	    //var books = JSON.parse(data);
	    var books = data;
	    var plist = document.getElementById('plist');
	    clearlist();
	    books.forEach(book => {
		var b =document.createElement('li');
		b.innerHTML = book;	 
		plist.appendChild(b);
	    });
	});
	
    }else if(cmd.evt ==='read'){
	pdfloader.getFile(cmd.file);
	machine.book = cmd.file;
	clearlist();
	var ptext = document.getElementById('page');
	ptext.value = 1;
    } 
}

function clearlist(){
    var plist = document.getElementById('plist');
    var cs =[];
    for (let i = 0; i < plist.children.length; i++) {
	cs.push(plist.children[i]);
    }
    cs.forEach(c => {c.parentNode.removeChild(c);});
}

function notep(cmd,canvname){
    //let curName = cmd.jid;
    //let curUser = machine.getUserInfo(curName);
    if(cmd.type !='note'){return;}
    if(cmd.history && cmd.history==true){
	//dont save
    }else{
	if(cmd.evt !=='loadnote' && cmd.evt !=='keyup' && cmd.evt !='textchange')
	    logger.savenote(machine.book,machine.pagenum,msgprocess.sermsg(cmd));
    }
    if(cmd.evt ==='click'){
	machine.createnote(cmd,canvname);
    }else if(cmd.evt ==='keyup'){
        // generate another evt, so can read textarea value
	var msg={
	    evt:'textchange',
	    id: cmd.id,
	    type:'note'
	};
	custEvt(msgprocess.sermsg(msg));
    }else if(cmd.evt ==='textchange'){
	let ta = document.getElementById(cmd.id);
	var msg={
	    evt:'textvalue',
	    text:ta.value,
	    id: cmd.id,
	    type:'note'
	};
	publishEvt(msg);

    }else if(cmd.evt ==='textvalue'){
	if(cmd.history){
	    machine.writehistory(cmd);
	}else{
	    machine.write(cmd);
	}

    }else if(cmd.evt ==='loadnote'){
	var data = logger.loadnote(machine.book,machine.pagenum);
        var msg ={
	    type: 'many',
	    records: data,
	    history: true
	};
	custEvt(msgprocess.sermsg(msg));
    } 

}

function loadinterp(cmd){
    let c = JSON.parse(cmd);
    
    interp(c);
}


