function rotate(degadd, elem) {
       let deg = parseInt(elem.getAttribute("degree")) + degadd;
       elem.setAttribute("degree",deg);
       elem.style['webkitTransform']= 'rotate('+deg+'deg)';
       elem.style['mozTransform']= 'rotate('+deg+'deg)';
       elem.style['msTransform']= 'rotate('+deg+'deg)';
       elem.style['oTransform']= 'rotate('+deg+'deg)';
       elem.style['transform']= 'rotate('+deg+'deg)';
    
    }
