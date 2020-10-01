
const fs = require('fs');
const path = require('path');
const http = require('http');
const formidable = require('formidable');
const {URLSearchParams} = require('url');

//const chatservice = require('./../message/xmpp.js');

const server = http.createServer((req, res) => {
    if (req.url.indexOf('/fileupload') >=0 && req.method.toLowerCase() === 'post') {
	// parse a file upload
	const form = formidable({ multiples: true });
	var begin = req.url.lastIndexOf('/') + 1;
	var sender = req.url.substring(begin);
	console.log('sender is ' + sender);
	form.uploadDir = path.join(__dirname, '/uploads');
	form.parse(req, (err, fields, files) => { 
            var oldpath = files.myFile.path ;
	    var newpath= path.join(__dirname, '/uploads/') + files.myFile.name ;
	    try{
		fs.rename(oldpath,newpath,function(err){
		    if(err) {
			console.log(err);
			return;
		    }
                    // chat service here to confirm to chat server.
	 	    console.log('uploaded ' + files.myFile.name);
                    //chatservice.send('uploaded ' + files.myFile.name +":" +sender);
		    res.writeHead(200, { 
			'Access-Control-Allow-Origin': '*'
		    });
                    res.write('done');
		    res.end();
		});
		
	    }catch(er){
		console.log(er);
	    }

	});
	
	return;
    }else if(req.url.indexOf('/list') >=0 && req.method.toLowerCase() ==='get'){
	res.writeHead(200, {
	    'Content-disposition': 'application/json',
	    'Access-Control-Allow-Origin': '*'
	});
	let upfolder = path.join(__dirname, '/uploads');
	let allfiles =[];
	try{
	    fs.readdir(upfolder, (err, files) => {
		files.forEach(file => {
		    allfiles.push(file);
		    
		});
		res.write(JSON.stringify(allfiles));
		res.end();
	    });
	    
	}catch(er){
	    console.log(er);
	}

	
    }else if(req.url.indexOf('/getbook') >=0 && req.method.toLowerCase() ==='get' ){
	// other wise serve a file to client
	console.log(req.url)
	var star =  req.url.lastIndexOf('/') + 1;
	var book = req.url.substring(star);
	let upfolder = path.join(__dirname, '/uploads');
	try{ 
	    res.writeHead(200, { 'Content-disposition': 'attachment', 
				 'Access-Control-Allow-Origin': '*'
			       });
	    var files = fs.createReadStream(upfolder +'/'+ book);
	    files.pipe(res); // also you can set content-type
	}catch(er){
	    console.log(er);

	}

    }

    
});

server.listen(9081, () => {
    console.log('Server listening on http://localhost:9081/ ...');
    //chatservice.connect('http','localhost');
});

