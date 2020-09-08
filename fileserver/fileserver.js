
const fs = require('fs');

const http = require('http');
const formidable = require('formidable');
const {URLSearchParams} = require('url')
 
const server = http.createServer((req, res) => {
  if (req.url.indexOf('/fileupload') >0 && req.method.toLowerCase() === 'post') {
    // parse a file upload
    const form = formidable({ multiples: true });
    //var searchParams1 = new URLSearchParams(req.url.search);
    //var filename = searchParams1.get("name");
    form.parse(req, (err, fields, files) => {
        //console.log(files.myFile);
        var oldpath = files.myFile.path;
	var newpath='/home/whiteboard/code/product/fileserver/uploads/' + files.myFile.name ;
	fs.rename(oldpath,newpath,function(err){
		if(err) throw err;
		//res.writeHead(200, { 'content-type': 'text/plain' 
		//	, 'Access-Control-Allow-Origin': '*'
		//	});
		//res.write('done');
		//res.end();
                // chat service here to confirm to chat server.
	 	console.log('uploaded ' + files.myFile.name);
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
});

