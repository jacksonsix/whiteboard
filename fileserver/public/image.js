
 function draw(canvasId) {
	      var ctx = document.getElementById(canvasId).getContext('2d')
	      , img = new Image()
	      , f = document.getElementById("uploadimage").files[0]
	      , url = window.URL || window.webkitURL
	      , src = url.createObjectURL(f);

	      img.src = src;
	      img.onload = function(){
	      ctx.drawImage(img,0,0);
	      url.revokeObjectURL(src);
	      }
}




function runOnce(){
    const fileSelect = document.getElementById("fileSelect"),
	  fileList = document.getElementById("fileList"),
	  fileElem = document.getElementById("fileElem");	  

    fileSelect.addEventListener("click", function (e) {
	if (fileElem) {
	    fileElem.click();
	}
	e.preventDefault(); // prevent navigation to "#"
    }, false);

    // list all files
    fileList.addEventListener("click", function (e) {
	refresh();
	e.preventDefault(); // prevent navigation to "#"
    }, false);


    // upload file
    fileElem.addEventListener("change", handleFiles, false);

    // select a  file to read
    var plist = document.getElementById('plist');
    plist.addEventListener('click',evt =>{
	var file = evt.target.innerHTML;
	var msg ={
	    type: 'file',
	    evt: 'read',
	    file: file
	};

	msgprocess.publishEvt(msg);
    });

    // change page
    var page = document.getElementById('page');
    page.addEventListener('change',function(evt){
	var p = page.value;
	var pn =0;
	const parsed = parseInt(p);
        if (isNaN(parsed)) {
	    pn= 0;
	}else{
	    pn = parsed;
	}
	
	var msg ={
	    type:'page',
	    evt: 'page',
	    num: pn
	};
	msgprocess.publishEvt(msg);
    });
    
}

function refresh(){
   
    var msg ={
	type: 'file',
	evt: 'list'
    };
    msgprocess.publishEvt(msg);

}


function handleFiles() {
    
    for (let i = 0; i < this.files.length; i++) {	
	//send to file server
	sendFile(this.files[i]);
    }
    
}


function sendFile(file) {
    const uri = uploader.baseUrl + "fileupload/";
    const xhr = new XMLHttpRequest();
    const fd = new FormData();
    
    xhr.open("POST", uri, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
	    console.log('upload success');
	    refresh();
        }
    };
    fd.append('myFile', file);
    // Initiate a multipart/form-data upload
    xhr.send(fd);
}

var uploader ={
    runOnce: runOnce,
    baseUrl:''
};
