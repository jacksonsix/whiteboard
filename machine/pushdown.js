// pushdown machine to parse instrcions
// format  (op a1 a2)  (op (op s) a2)
// return data structure, [ op  a1 a2]  , [op [ s] a2]

function extractLabels(codelist){
    let code=[];
    let label={};
    for(var i=0;i<codelist.length;i++){
	let c = codelist[i];
	let ch = c.charAt(0);
	if(ch ==='('){  //code
	    code.push(c);
	}else{
	    label[c] = code.length;
	}
    }

    return {
	'code':code,
	'label':label
    }
}

function pushdown(str){
    // token spliter { ( ) ' ' '\t'}
    let pos = 0;
    function nextChar(){
	if(pos == str.length) return null;
	let c = str.charAt(pos);
	pos++;
	return c;
    }


    function process(){
	let level = 0;
	let word ='';
	let current=[];
	let stack=[];

	while(true){
            let c = nextChar();
            if(c === null) break;
	    if(c ==='('){
		if(word.length >0){	current.push(word); word=''; }
		stack.push(current);		
		current = [];
	        
	    }else if(c ===')'){
		if(word.length >0){	current.push(word); word=''; }
		let t  = stack.pop();
		t.push(current);
		current = t;
	    }else if(c===' ' || c==='\t'){
                //ignore, discard
		if(word.length >0){	current.push(word); word=''; }
	    }else{
		word +=c;
	    } 
	}

	return current[0];
    }

    return process();
}

//module.exports={
//    "pushdown":pushdown
//}
