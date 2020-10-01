
function flagfunc(){
    let init = false;
    let instance;

    function get(){
	return init;
    }
    function set(flag){
	init = flag;
    }
    function getinst() { return instance;}
    function setinst(ins) {instance = ins;}

    return {
	get:get,
	set:set,
	getinst:getinst,
	setinst:setinst
    }

}

function initState(){
	let DrawingMode =['canvas','picture','text'];
	let UserState = ['drag','rotate','resize','draw'];
	let currentMode = DrawingMode[0];
	let currentUserState = UserState[3];	
        let curObject;
	function getMode(){ return currentMode;}
	function getState() {return currentUserState;}
	function setMode(mode){ currentMode = mode;}
	function setState(state){ currentUserState= state;}
        function getCurObject(){return curObject;}
        function setCurObject(o){curObject = o;}

    return {
	"getMode":getMode,
	"getState":getState,
	"setMode":setMode,
	"setState":setState,
	"getCurObj":getCurObject,
	"setCurObj":setCurObject
    }
}

let flag = flagfunc();

function getInstance(){
   
    if(flag['get']() ===true){
	return flag['getinst']();
    }else{
        let instance = initState();
	flag['setinst'](instance);
	flag['set'](true);
        return instance; 
    }
  
 
}
