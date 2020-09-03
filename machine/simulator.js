// simulate the code run in machine.
// machine + assembler

function make_machine(){
    let registers = [];
    let runtimelibs = [];
    let codelist = [];
    let labels = {};
    let stack = [];

    registers['pc'] = 0;
    registers['flag'] = false;
    
    function getReg(name){ return registers[name]; }
    function setReg(name,value){ registers[name]=value;}   
    function initStack() {stack = [];}
    function save(val) {stack.push(val);}
    function restore() { let v = stack.pop();  return v; }
    function nextInst(pc){
	let flag = Number.isInteger(pc);
	if(flag){
	    return pc;
	}else{ // is a label
	    let n = labels[pc];
	    return n;
	}
    }
    function run(){

        // cannot assumbe machine always halt in one place.
	// maybe 2 or more finish state.
	// next instruct , will be calculated by instrction and labels.
	let pc = getReg('pc');
	let cur = codelist[pc];
	let next;
	while(true){
	    cur.proc();
	   
	    pc = getReg('pc');
            next = nextInst(pc);
            cur = codelist[next];
	    if(typeof(cur) ==='undefined'){
		  console.log('done');
		  break;
	    }
           
	}
	
    }
    function runStep(){
	let t1 = window.setTimeout(function() { runStep(); }, 1000);
	let pc = getReg('pc');
	let cur = codelist[pc];
	let next;
	
	cur.proc();
	   
	pc = getReg('pc');
        next = nextInst(pc);
        cur = codelist[next];
	if(typeof(cur) ==='undefined'){
	    console.log('done');
	    window.clearTimeout(t1);
	 }
           
	
    }
    function load(regs,code,labels,lib){
	regs.forEach(r => { registers[r] ='*u*'; });
	codelist = code;
	labels = labels;
	lib.forEach(l => {runtimelibs[l.name] = l.value });
    }
    return {
	"getReg": getReg,
	"setReg": setReg,
	"initStack": initStack,
	"save":save,
	"restore":restore,
	"run":run,
	"load":load,
	"runStep":runStep
    }
}

//module.exports={
//    "make_machine": make_machine
//}
