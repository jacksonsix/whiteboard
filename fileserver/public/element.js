
let ifunc = index();

function createElement(parent,etype){
    let p =  document.getElementById(parent);
    
    let c = document.createElement(etype);
    c.setAttribute("degree",0);
    c.setAttribute("xtrans","");
    c.setAttribute("ytrans","");
    c.setAttribute("xytrans","");
    c.id = etype + ifunc();
   
    p.appendChild(c);
    return c;
    
}

function index(){
    let num =0;
    function nextNumber(){
	num++;
	return num;
    }

    return nextNumber;
}
