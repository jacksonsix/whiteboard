const http = require('http');
const fs = require('fs');
//const fileserver = require('./fileserver/node_modules/formidable');

const requestListener = function (req, res) {
  
  var codepath='';

  //res.write('Hello World!');
  console.log(req.url);
  if(req.url =='/favicon.ico' || req.url.indexOf('timeout') > 0){
    //res.writeHead(200, {'Content-Type': 'text/javascript'});  
  }
  else  if(req.url.indexOf('.js') > 0){
	 res.writeHead(200, {'Content-Type': 'text/javascript'});
	 var filename ='.'+ codepath + req.url;
	 fs.readFile(filename, function(err, data) {
		if (err) {
			   res.write('read file error');  
			   res.end();
			   throw err; 
		}
		res.write(data);  
		res.end();
       });
  } else if(req.url.indexOf('.css') > 0){
	res.writeHead(200, {'Content-Type': 'text/css'});
	var filename ='.'+ codepath +req.url;
	fs.readFile(filename, function(err, data) {
	if (err) {
		   res.write('read file error');  
		   res.end();
		   throw err; 
	}
	res.write(data);  
	res.end();
       });
  }else {
	res.writeHead(200, {'Content-Type': 'text/html'});
	var interm = req.url.lastIndexOf('/');
	codepath = req.url.substring(0,interm);
	var filename = '.' + req.url;
	fs.readFile(filename, function(err, data) {

	if (err) {
		res.write('read file error');  
	       res.end();
	       throw err; 
	}
	res.write(data);  
	res.end();
  });
  }

  
}

const server = http.createServer(requestListener);
console.log("http service listen to 9080");
server.listen(9080);
