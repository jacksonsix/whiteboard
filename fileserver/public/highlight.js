var highlighter={
    users:{},
    highlight: function(cmd,canvasname){
	
	let curName = cmd['jid'];
	let curUser = highlighter.getUserInfo(curName);

	dup = document.getElementById(canvasname);
	dupcontext = dup.getContext('2d');
	highlighter.highlightLine(dupcontext, curUser.x, curUser.y, cmd.x, cmd.y);
	let d = {};
	d.x = cmd.x;
	d.y = cmd.y;
	highlighter.updateUserInfo(curName,d);

    },

    drawLine: function (context, x1, y1, x2, y2) {
	context.beginPath();
	context.strokeStyle = 'black';
	context.lineWidth = 1;
	context.moveTo(x1, y1);
	context.lineTo(x2, y2);
	context.stroke();
	context.closePath();
    },
    
    highlightLine: function (context, x1, y1, x2, y2) {
	context.beginPath();
	context.strokeStyle = 'yellow';
	context.lineWidth = 3;
	context.moveTo(x1, y1);
	context.lineTo(x2, y2);
	context.stroke();
	context.closePath();
    },

    getUserInfo:function (user){
	if(highlighter.users[user]  && highlighter.users[user] != null){
	    return highlighter.users[user];
	}else{
	    let a  = {};
	    a.x =0;
	    a.y = 0;
	    highlighter.users[user] = a;
	    return highlighter.users[user];
	}
    },

    updateUserInfo:function (user,data){
	let info = highlighter.getUserInfo(user);
	highlighter.users[user] = data;

    }

};


