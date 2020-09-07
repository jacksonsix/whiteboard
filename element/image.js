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

       function sendToserver(){
	
	const fileList = this.files;
	var file = files[0];
	const reader = new FileReader();
	reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
	reader.readAsDataURL(file);
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
    }
  }
}


function sendFiles() {
  const imgs = document.querySelectorAll(".obj");
  
  for (let i = 0; i < imgs.length; i++) {
    new FileUpload(imgs[i], imgs[i].file);
  }
}


function FileUpload(img, file) {
  const reader = new FileReader();  
  this.ctrl = createThrobber(img);
  const xhr = new XMLHttpRequest();
  this.xhr = xhr;
  
  const self = this;
  this.xhr.upload.addEventListener("progress", function(e) {
        if (e.lengthComputable) {
          const percentage = Math.round((e.loaded * 100) / e.total);
          self.ctrl.update(percentage);
        }
      }, false);
  
  xhr.upload.addEventListener("load", function(e){
          self.ctrl.update(100);
          const canvas = self.ctrl.ctx.canvas;
          canvas.parentNode.removeChild(canvas);
      }, false);
  xhr.open("POST", "http://localhost:9081/fileupload");
  xhr.overrideMimeType('text/plain; charset=x-user-defined-binary');
  reader.onload = function(evt) {
    xhr.send(evt.target.result);
  };
  reader.readAsBinaryString(file);
}
