function getShapeAttribute(s){
        let xtrans = s.getAttribute('xtrans') || ''; 
        let ytrans = s.getAttribute('ytrans') || '';
        let xytrans = s.getAttribute('xytrans')|| '';
        let degree = s.getAttribute('degree') || '';
        return xtrans + ' ' + ytrans+ ' '+ xytrans + ' ' + degree;
}

function scale(id,xratio,yratio){
    let s = document.getElementById(id);
    if(s ===null) return;
    let final ='';
    if(yratio === 1.0){
        let xtrans = s.getAttribute('xtrans') || ''; 
        let ytrans = s.getAttribute('ytrans') || '';
        let xytrans = s.getAttribute('xytrans')|| '';
        xtrans = 'scale(' + xratio +', ' + yratio +')';
        s.setAttribute('xtrans',xtrans);
       
    }else if(xratio ===1.0){
        let xtrans = s.getAttribute('xtrans') || ''; 
        let ytrans = s.getAttribute('ytrans') || '';
        let xytrans = s.getAttribute('xytrans')|| '';
        ytrans = 'scale(' + xratio +', ' + yratio +')';
        s.setAttribute('ytrans',ytrans);
        
    }else{
        let xtrans = s.getAttribute('xtrans') || ''; 
        let ytrans = s.getAttribute('ytrans') || '';
        let xytrans = s.getAttribute('xytrans')|| '';
        xytrans = 'scale(' + xratio +', ' + yratio +')';
        s.setAttribute('xytrans',xytrans);
        
    }
    final = getShapeAttribute(s);
    s.style['webkitTransform'] = final;
    s.style['mozTransform'] = final;
    s.style['msTransform'] = final;
    s.style['oTransform'] = final;
    s.style['transform'] = final;
    
}

function scale2(id,xratio,yratio){
    let elem = document.getElementById(id);
    if(elem ===null) return;
    let at = 'scale(' + xratio +', ' + yratio +')';
    elem.style['webkitTransform']= at;
    elem.style['mozTransform']= at;
    elem.style['msTransform']= at;
    elem.style['oTransform']= at;
    elem.style['transform']= at;
}

function rotate(id,degadd) {
       let elem = document.getElementById(id);
       if(elem ===null) return;
       let degAttr  = elem.getAttribute("degree");
       if(degAttr ===null) degAttr = 0;
       let deg = degadd;
       elem.setAttribute("degree", 'rotate('+deg+'deg)');
       
       let final = getShapeAttribute(elem);
       elem.style['webkitTransform']= final;
       elem.style['mozTransform']= final;
       elem.style['msTransform']= final;
       elem.style['oTransform']= final;
       elem.style['transform']= final;
    
    }



function toInt(strint){
    if(strint.length == 0){
	return 0;
    }else{
	return parseInt(strint.substring(0,strint.length -2));
    }
}

function move(id,deltax,deltay){
    let target  =  document.getElementById(id);
    if(target ===null) return;
    target.style.position='absolute';
    let left =  toInt(target.style.left);
    let top = toInt(target.style.top);
    target.style.left = left + deltax;
    target.style.top = top + deltay;
}

//////////////////////////////////////////
let lastX =0;
let lastY =0;
function moveObject(curId,x,y){
      
      let dx = x - lastX;
      let dy = y - lastY;
      lastX = x;
      lastY = y;

      if(Math.abs(dx) <10 && Math.abs(dy) <10){	 				
	move(curId,dx,dy);
      }
}

function eresizeObject(curId,x,width){
    console.log(width);
    let target = document.getElementById(curId);
    if(target ===null) return;
    let dx = x - target.offsetLeft;
    let xratio = dx * 1.0 / width;
    scale(curId,xratio,1.0);  
}

function seresizeObject(curId,x,y,width,height){
    let target = document.getElementById(curId);
    if(target ===null) return;
    let dx = x - target.offsetLeft;
    let xratio = dx * 1.0 / width;
    let dy = y - target.offsetTop;
    let yratio = dy * 1.0 / height;
    scale(curId,xratio,yratio);
}

function sresizeObject2(curId,y){
    let target = document.getElementById(curId);
    if(target ===null) return;
    let dy = y - target.offsetTop;	 				
    target.style.height =  dy;
}

function sresizeObject(curId,y,height){
    let target = document.getElementById(curId);
    if(target ===null) return;
    let dy = y - target.offsetTop;
    let yratio = dy * 1.0 / height
    scale(curId,1.0,yratio);
}

function calcAngleDegrees(x, y) {
  return Math.atan2(y, x) * 180 / Math.PI;
}

function rotateObject(curId,x,y){
    let degree =0;
    let target = document.getElementById(curId);
    if(target===null) return;
    let dx = x - target.offsetLeft;
    let dy = y - target.offsetTop;
    degree = calcAngleDegrees(dx,dy);
    rotate(curId,degree);
}

function createFrame(id){
    let target = document.getElementById(id);
    let left =  toInt(target.style.left) ;
    let top =   toInt(target.style.top) ;
    var newDiv = document.createElement("canvas");
    newDiv.style.position= 'absolute';
    newDiv.style.border='solid 1px red';
    newDiv.style.left = left;
    newDiv.style.top = top;
    newDiv.style.height = 100;
    newDiv.style.width = 100;
    newDiv.style["z-index"] = 10;
    newDiv.style.border = 1;
    newDiv.id="copy1";
    newDiv.addEventListener('mousemove',function(evt){
	evt.stopPropagation();
    });
    document.body.appendChild(newDiv);
    return newDiv;

}

let MARGIN =  15;

function  inRect(x,y,rect){
    if( x > rect.x
	&& x < rect.x + rect.width
	&& y > rect.y
	&& y < rect.y + rect.height){
	  return true;
	}
	return false;						    
}
function rightEdgeBox(rect){
	let box ={};
	box.x = rect.x + rect.width - MARGIN;
	box.y = rect.y  + MARGIN;
	box.width = MARGIN;
	box.height =  rect.height - MARGIN * 2;
	return box; 
}
function leftEdgeBox(rect){  
       let box ={};
       box.x = rect.x;
       box.y = rect.y  + MARGIN;
       box.width = MARGIN;
       box.height =  rect.height - MARGIN * 2;
       return box; 
}
function upperEdgeBox(rect){
       let box ={};
       box.x = rect.x + MARGIN;
       box.y = rect.y;
       box.width =  rect.width - MARGIN * 2;
       box.height =  MARGIN;
       return box; 
}
function lowerEdgeBox(rect){
       let box ={};
       box.x = rect.x +  MARGIN;
       box.y = rect.y  + rect.height - MARGIN;
       box.width = rect.width - MARGIN * 2;
       box.height =  MARGIN;
       return box; 
}
function neEdgeBox(rect){
       let box ={};
       box.x = rect.x + rect.width - MARGIN;
       box.y = rect.y  ;
       box.width = MARGIN;
       box.height =  MARGIN;
       return box; 
}

function nwEdgeBox(rect){
       let box ={};
       box.x = rect.x ;
       box.y = rect.y  ;
       box.width = MARGIN;
       box.height =  MARGIN;
       return box; 
}
function seEdgeBox(rect){
       let box ={};
       box.x = rect.x + rect.width - MARGIN;
       box.y = rect.y + rect.height - MARGIN ;
       box.width = MARGIN;
       box.height =  MARGIN;
       return box; 
}
function swEdgeBox(rect){
       let box ={};
       box.x = rect.x + MARGIN;
       box.y = rect.y + rect.height - MARGIN ;
       box.width = MARGIN;
       box.height =  MARGIN;
       return box; 
}
				 
				 
function checkEdge(x,y,rect){
    let inside = inRect(x, y,rect);
    if(!inside){
	return "default";
    }else{
	if(inRect(x,y,rightEdgeBox(rect))){
	 return 'e-resize';
	}else if(inRect(x,y,leftEdgeBox(rect))){
	 return 'w-resize';
	}else if(inRect(x,y,upperEdgeBox(rect))){
	 return 'n-resize';
	}else if(inRect(x,y,lowerEdgeBox(rect))){
	 return 's-resize';
	}else if(inRect(x,y,seEdgeBox(rect))){
	 return 'se-resize';
	}else if(inRect(x,y,swEdgeBox(rect))){
	 return 'sw-resize';
	}else if(inRect(x,y,neEdgeBox(rect))){
	 return 'clock-rotate';
	}else if(inRect(x,y,nwEdgeBox(rect))){
	 return 'counter-rotate';
	}else{
         return 'move';
        }

    }
}


