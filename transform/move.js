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
