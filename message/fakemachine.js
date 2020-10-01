// dup on another canvas
// read in mhistory
let dup='';
let dupcontext='';

let users={};

var machine={};
machine.createnote = null;
machine.write = null;
machine.notep = notep;
machine.interp = interp;
machine.filep = filep;
machine.pagep = pagep;
machine.book ='';
machine.pagenum = 1;

function manyp(cmd){
    
    var records = cmd.records;
    var rs = records.split('\n');
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
	$.get( uploader.baseUrl + "list/test", function( data ) {	
	    var books = JSON.parse(data);
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
    let curName = cmd['name'];
    let curUser = getUserInfo(curName);
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

function highlight(cmd,canvname){
    let curName = cmd['name'];
    let curUser = getUserInfo(curName);
    if(cmd.type !='note'){return;}
    dup = document.getElementById(canvname);
    dupcontext = dup.getContext('2d');
    //ctx.globalAlpha = 0.4;
    if(cmd.evt ==='click'){
	console.log('generate note');
    }else if(cmd.evt ==='keydown'){
	cosole.log('send keydown evt to note');
    }

}

function loadinterp(cmd){
    let c = JSON.parse(cmd);
    
    interp(c);
}


function interp(cmd){
    let curName = cmd['name'];
    let curUser = getUserInfo(curName);
    if(cmd.type !='draw'){return;}
    dup = document.getElementById("canvas");
    dupcontext = dup.getContext('2d');
    if(cmd.evt =='mousedown'){
	updateUserInfo(curName,cmd);
        
    }else if(cmd.evt =='mousemove'){
	let curUser = getUserInfo(curName);
	let dupx=curUser.x;
	let dupy=curUser.y;
	drawLine(dupcontext, dupx, dupy, cmd.x, cmd.y);
	let d = {};
	d.x = cmd.x;
	d.y = cmd.y;
	updateUserInfo(curName,d);
    }else if(cmd.evt =='mouseup'){
        
    }else{
	//
    }

}

function drawLine(context, x1, y1, x2, y2) {
    context.beginPath();
    context.strokeStyle = 'black';
    context.lineWidth = 1;
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
}

function getUserInfo(user){
    if(users[user]  && users[user] != null){
	return users[user];
    }else{
	let a  = {};
	a.x =0;
	a.y = 0;
	users[user] = a;
	return users[user];
    }
}

function updateUserInfo(user,data){
    let info = getUserInfo(user);
    info.x = data.x;
    info.y = data.y;
    users[user] = info;

}


