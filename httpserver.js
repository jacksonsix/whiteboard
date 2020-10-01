const http = require('http');
const fs = require('fs');
//const fileserver = require('./fileserver/node_modules/formidable');
var d = require('domain').create()
d.on('error', function(err){
    // handle the error safely
    console.log(err)
})

const requestListener = function (req, res) {
  
  var codepath='';

  //res.write('Hello World!');
  console.log(req.url);
  if(req.url =='/favicon.ico' || req.url.indexOf('timeout') > 0){
    res.writeHead(200, {'Content-Type': 'text/javascript'});  
    res.end();
  }
  else  if(req.url.indexOf('.js') > 0){
	 res.writeHead(200, {'Content-Type': 'text/javascript'});
	 var filename ='.'+ codepath + req.url;
	 fs.readFile(filename, function(err, data) {
		if (err) {
			   console.log( err);  
			   res.end();
			    
		}else{
		res.write(data);  
		res.end();
		}

       });
  } else if(req.url.indexOf('.css') > 0){
	res.writeHead(200, {'Content-Type': 'text/css'});
	var filename ='.'+ codepath +req.url;
	fs.readFile(filename, function(err, data) {
	if (err) {
		   res.write('read file error');  
		   res.end();
		   console.log( err); 
	}
	res.write(data);  
	res.end();
       });  
  }else if(req.url.indexOf('.svg') > 0  || req.url.indexOf('.img') > 0 ||  req.url.indexOf('.png') > 0){
	res.writeHead(200, {'Content-Type': 'image/svg+xml'});
	var filename ='.'+ codepath +req.url;
	fs.readFile(filename, function(err, data) {
	if (err) {
		   res.write('read file error');  
		   res.end();
		    console.log( err); 
	}
	res.write(data);  
	res.end();
       });  
  }else if(req.url.indexOf('.html') >0 ) {
	res.writeHead(200, {'Content-Type': 'text/html',
           'Set-Cookie':["SameSite=None"]
         });
        
	var interm = req.url.lastIndexOf('/');
	codepath = req.url.substring(0,interm);
	var filename = '.' + req.url;
	fs.readFile(filename, function(err, data) {
                if(err){ 
                  console.log(err);
                }else{
		res.write(data);  
		res.end();
                }
	
	 });
	
  }else{
      res.writeHead(404, {'Content-Type': 'text/html'});
      res.end();
  }

  
}

const server = http.createServer(requestListener);
console.log("http service listen to 8080");
server.listen(8080);
