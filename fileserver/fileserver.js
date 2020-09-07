const http = require('http');
const fs = require('fs');
const fileserver = require('formidable');

const requestListener = function (req, res) {
  
var codepath='';

  //res.write('Hello World!');
  console.log(req.url);
  if (req.url.indexOf('/fileupload') > 0) {
    var form = new fileserver.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.path;
      console.log(oldpath);
      console.log(files.filetoupload.name);
      var newpath = '/home/whiteboard/code/product/fileserver/uploads/' + '22.svg';
        fs.rename(oldpath, newpath, function (err) {
	if (err) throw err;
	res.write('File uploaded and moved!');
	res.end();
      });

   });
  }
  
}

const server = http.createServer(requestListener);
console.log("file service listen to 9081");
server.listen(9081);
