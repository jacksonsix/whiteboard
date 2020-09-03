const http = require('http');
const fs = require('fs');
const requestListener = function (req, res) {
  
  //res.write('Hello World!');
  console.log(req.url);
  if(req.url =='/favicon.ico' || req.url.indexOf('timeout') > 0){
	 //res.writeHead(200, {'Content-Type': 'text/javascript'});  
  }
  else  if(req.url.indexOf('.js') > 0){
	 res.writeHead(200, {'Content-Type': 'text/javascript'});
	 var filename ='.'+ req.url;
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
	 var filename ='.'+ req.url;
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
	 var filename ='.'+ req.url;
	 fs.readFile('dsdemo.html', function(err, data) {
	//console.log(data);
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
server.listen(9080);
