// dup on another canvas
// read in mhistory
let dup='';
let dupcontext='';

let users={};


function loadinterp(cmd){
	let c = JSON.parse(cmd);
	interp(c);
}


function interp(cmd){
	let curName = cmd['name'];
	let curUser = getUserInfo(curName);
	
        dup = document.getElementById("canvas");
	dupcontext = dup.getContext('2d');
	if(cmd.evttype =='mousedown'){
		updateUserInfo(curName,cmd);
              	
	}else if(cmd.action =='drawline'){
		let curUser = getUserInfo(curName);
		let dupx=curUser.x;
		let dupy=curUser.y;
		drawLine(dupcontext, dupx, dupy, cmd.parameters[0], cmd.parameters[1]);
		let d = {};
		d.x = cmd.parameters[0];
		d.y = cmd.parameters[1];
		updateUserInfo(curName,d);
	}else if(cmd.type =='mouseup'){
              
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
