function createnote(evt,canvaname){
    addTextBox(evt.x,evt.y);
}
function write(evt){
    var id = evt.id;
    if(evt.jid === mplugin.jid){ return; }
    var note = document.getElementById(id);
    note.value = evt.text;
}

function writehistory(evt){
    var id = evt.id;
    var note = document.getElementById(id);
    note.value = evt.text;
}


function addTextBox(left,top){

    let t = document.createElement("div");
    t.id = 'c'+ left + '' + top;
    t.style['left'] = left;
    t.style['top'] = top;
    t.classList.add('user');

    let can = document.createElement("textarea");
    can.id = 't' + t.id;
    can.autocomplete="off";
    can.addEventListener('keyup',function(evt){
	msg = {
	    'evt':'keyup'
	    ,'key':evt.key 
	    ,'keyCode':evt.keyCode
	    ,'id':can.id
	    ,'type':'note'
	};
	custEvt(msgprocess.sermsg(msg));
	//publishEvt(msg);
    });
    let point = document.createElement("div");
    point.classList.add('leftcorner');
    t.appendChild(point);
    t.appendChild(can);
    let plate = document.getElementById("plate");
    plate.appendChild(t);
    $( "#"+t.id ).draggable();
}

function getBox(evt){
    let boxes = document.getElementsByClassName('user');
    for(var i=0;i<boxes.length;i++){
	let box = boxes[i];
	let rect = box.getBoundingClientRect();
	if(evt.clientX > rect.left
           && evt.clientX <rect.left + rect.width
	   && evt.clientY > rect.top
	   && evt.clientY < rect.top + rect.height){
	    return box;}
    }
    return null;
}
function processEvt(evt){
    let sta = document.getElementById('status');
    if(sta.value !== 'note'){ return;}
    let cur = getBox(evt) ;
    if(cur == null){	      
	let left = evt.clientX;
	let top  = evt.clientY;
	addTextBox(left,top);
    }	  
}

var pdfnote={
    createnote:createnote,
    write:write,
    writehistory:writehistory
}
