      let canavsId ='holder';      ///pass in parameter


      let status = 'default';
      let cursorStyle ='default';


      document.addEventListener("mousemove", evt => {
      let e = evt || window.event;
      let obj = document.getElementById(canavsId);
      let curRect = obj.getBoundingClientRect();
      let sty = checkEdge(e.clientX,e.clientY,curRect);
      // more cursor images;
      
      obj.style.cursor= sty;
      if(sty ==='clock-rotate'){
        obj.style.cursor = "url('pic/rotate.png'),auto";
      }
      cursorStyle = sty;
      if(sty ==='move'
       || sty==='e-resize'
       || sty ==='s-resize'
       || sty ==='se-resize'
       || sty ==='clock-rotate'){
        obj.style['border-style'] ='dotted';
      }else{
        obj.style['border-style'] = 'none';
      }

      // object action
      if(status==='move'){
          moveObject(canavsId,e.clientX,e.clientY);
      }else if(status==='e-resize'){
          eresizeObject(canavsId,e.clientX,obj.offsetWidth);
      }else if(status==='se-resize'){
          seresizeObject(canavsId,e.clientX,e.clientY,obj.offsetWidth,obj.offsetHeight);
      }else if(status==='s-resize'){
          sresizeObject(canavsId,e.clientY,obj.offsetHeight);
      }else if(status==='clock-rotate'){
          rotateObject(canavsId,e.clientX,e.clientY);
      }
      });


      
      // check and set status
      document.addEventListener("mousedown",function(evt){
        let obj = document.getElementById(canavsId);
        let curRect = obj.getBoundingClientRect();
        cursorStyle = checkEdge(evt.clientX,evt.clientY,curRect);
        lastX = evt.clientX;
        lastY = evt.clientY;
        if(cursorStyle==='move'){
           status = 'move';
        }else if(cursorStyle==='e-resize'){
          status ='e-resize';   
        }else if(cursorStyle==='se-resize'){
         status ='se-resize';
        }else if(cursorStyle==='s-resize'){
         status ='s-resize';
        }else if(cursorStyle==='clock-rotate'){
         status ='clock-rotate';
        }
        else{
         status ='default';
        }
       
      });

      document.addEventListener("mouseup",function(evt){
         status ='default';
        
      });

 
     
