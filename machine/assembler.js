// assembler for simulator.
// update codelist, and labels
// for each command give a procedure to run


//draw cirle  (circle x y r)
//draw rectangle (rect left top width height)
// draw line   (line x1 y1 x2 y2)







function assembler(machine,codelist,labels){
    function getType(inst) {return inst[0];}


    function nextpc(){  machine.setReg('pc', machine.getReg('pc') + 1); }
    function assemble(inst){
	let type = getType(inst);
	if(type ==='assign'){
	    let target = inst[1][1];	    
	    let src = inst[2];
	    function ag(){
		let val = 4;
		machine.setReg(target,val);
	        nextpc();
	    }
	    return ag;
	}else if(type ==='test'){
	    function ts(){
		let result = false;
		result = op(re);
		machine.setReg('flag',result);
		nextpc();
	    }
	    return ts;
	}else if(type ==='branch'){
	    function br(){
		let lab = lbl;
		let f = machine.getReg('flag');
		if(f){
		    machine.setReg('pc',lab);
		}else{
		    nextpc();
		}
	    }
	    return br;

	}else if(type ==='goto'){
	    function g(){
		let lbl ='' ;
		machine.setReg('pc',lbl);
	    }
	    return g;
	}else if(type ==='perform'){
	    function pm(){
		op();
		nextpc();
	    }
	    return pm;
	}else{
	    throw Exception('assemble error');
	}
    }

    //whiteboard
    function asseblewhiteboard(inst){
	let type = getType(inst);
	let canvas = document.getElementById('canvas');
	let ctx = canvas.getContext('2d');
	switch(type){
	case 'circle':
	    function c(){
		ctx.beginPath();
		ctx.arc(inst[1], inst[2], inst[3], 0, Math.PI * 2, true);
		ctx.stroke();
		nextpc();
	    }
	    return c;
	case 'rect':
	    function re(){	     
		ctx.strokeRect(inst[1], inst[2], inst[3], inst[4]);
		nextpc();
	    }
	    return re;
	case 'line':
	    function l(){
		ctx.beginPath();
		ctx.moveTo(inst[1],inst[2]);
		ctx.lineTo(inst[3],inst[4]);
		ctx.stroke();
		nextpc();
	    }
	    return l;
	default:
	    throw 'whiteboard assemble error';
	    break;
	}
    }
    //
 
//    codelist.forEach(function(code){
//	let proc = assemble(code);
//	code.proc = proc;
//    });

    //for whiteboard
    codelist.forEach( code => {
	let proc = asseblewhiteboard(code);
	code.proc = proc;
    });
    //
    
    return{
	"code":codelist,
	"labels": labels
    }

}
