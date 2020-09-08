
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
	 	console.log('uploaded ' + files.myFile.name);
	});
    });
 
    return;
  }
 
  // show a file upload form
  res.writeHead(200, { 'content-type': 'text/html' 
	, 'Access-Control-Allow-Origin': '*'
	});
  res.end(`
    <h2>With Node.js <code>"http"</code> module</h2>
    <form action="/api/upload" enctype="multipart/form-data" method="post">
      <div>Text field title: <input type="text" name="title" /></div>
      <div>File: <input type="file" name="multipleFiles" multiple="multiple" /></div>
      <input type="submit" value="Upload" />
    </form>
  `);
});
 
server.listen(9081, () => {
  console.log('Server listening on http://localhost:9081/ ...');
});

