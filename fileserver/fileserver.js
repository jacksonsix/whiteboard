
const fs = require('fs');

const http = require('http');
const formidable = require('formidable');
const {URLSearchParams} = require('url');

const chatservice = require('/home/whiteboard/code/product/chatserver/serviceclient.js');
 
const server = http.createServer((req, res) => {
  if (req.url.indexOf('/fileupload') >=0 && req.method.toLowerCase() === 'post') {
    // parse a file upload
    const form = formidable({ multiples: true });
    var begin = req.url.lastIndexOf('/') + 1;
    var sender = req.url.substring(begin);
    console.log('sender is ' + sender);
    form.parse(req, (err, fields, files) => {
        //console.log(files.myFile);
        var oldpath = files.myFile.path;
	var newpath='/home/whiteboard/code/product/fileserver/uploads/' + files.myFile.name ;
	fs.rename(oldpath,newpath,function(err){
		if(err) throw err;
                // chat service here to confirm to chat server.
	 	console.log('uploaded ' + files.myFile.name);
                chatservice.send('uploaded ' + files.myFile.name +":" +sender);
		res.writeHead(200, { 
				       'Access-Control-Allow-Origin': '*'
			});
                res.write('done');
		res.end();
	});
    });
 
    return;
  }
  // other wise serve a file to client
  console.log(req.url)
  var files = fs.createReadStream(req.url);
  //res.writeHead(200, {'Content-disposition': 'attachment; filename=package.json"}'}); //here you can specify file name
  files.pipe(res); // also you can set content-type
  res.writeHead(200, { 'Content-disposition': 'attachment', 
	               'Access-Control-Allow-Origin': '*'
	});
  
});
 
server.listen(9081, () => {
  console.log('Server listening on http://localhost:9081/ ...');
  chatservice.connect('http','localhost');
});

