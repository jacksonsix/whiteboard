// svg  scale and move (left,top)


function scale(svgid,xratio,yratio){
    let s = document.getElementById(svgid);
    let at = 'scale(' + xratio +', ' + yratio +')';
    let old = s.getAttribute('transform');
     if(old ===null) old ='';
    s.setAttribute('transform',old + ' ' + at);    
    //return svg;
}

function moveTo(svgid,left,top){
    let s = document.getElementById(svgid);
    let at = 'translate(' + left +' ' + top +')';
    let old = s.getAttribute('transform');
     if(old ===null) old ='';
    s.setAttribute('transform',old + ' ' + at);
}


function rotate(svgid,deg){
    let s = document.getElementById(svgid);
    let at = 'rotate(' + deg  +')';
    let old = s.getAttribute('transform');
    if(old ===null) old ='';
    s.setAttribute('transform',old +" " +at);
}

// accumulate effect cannot easily copplase to one step.

// skewY(angle)
// skewX(angle)
