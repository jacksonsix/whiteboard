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

function notep(cmd,canvname){
    let curName = cmd['name'];
    let curUser = getUserInfo(curName);
    if(cmd.type !='note'){return;}
   
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
	machine.write(cmd);
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


