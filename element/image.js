
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


const fileSelect = document.getElementById("fileSelect"),
    fileElem = document.getElementById("fileElem"),
    fileList = document.getElementById("fileList");

fileSelect.addEventListener("click", function (e) {
  if (fileElem) {
    fileElem.click();
  }
  e.preventDefault(); // prevent navigation to "#"
}, false);

fileElem.addEventListener("change", handleFiles, false); 

function handleFiles() {
  if (!this.files.length) {
    fileList.innerHTML = "<p>No files selected!</p>";
  } else {
    fileList.innerHTML = "";
    const list = document.createElement("ul");
    fileList.appendChild(list);
    for (let i = 0; i < this.files.length; i++) {
      const li = document.createElement("li");
      list.appendChild(li);
      
      const img = document.createElement("img");
      img.src = URL.createObjectURL(this.files[i]);
      img.classList.add("obj");
      img.height = 60;
      img.onload = function() {
        URL.revokeObjectURL(this.src);
      }
      li.appendChild(img);
      const info = document.createElement("span");
      info.innerHTML = this.files[i].name + ": " + this.files[i].size + " bytes";
      li.appendChild(info);
      //send to file server
      sendFile(this.files[i]);
    }
  }
}


function sendFile(file) {
    const uri = "http://localhost:9081/fileupload/98";
    const xhr = new XMLHttpRequest();
    const fd = new FormData();
    
    xhr.open("POST", uri, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            //alert(xhr.responseText); // handle response.
	    console.log('upload success');
        }
    };
    fd.append('myFile', file);
    // Initiate a multipart/form-data upload
    xhr.send(fd);
}
