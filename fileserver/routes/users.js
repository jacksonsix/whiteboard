var express = require('express');
var router = express.Router();
const path = require('path');
const fs = require('fs');
const formidable = require('formidable');


/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});



router.get('/list', function(req,res){
    let upfolder = path.join(__dirname, '../uploads');
    console.log(upfolder);
    let allfiles =[];
    try{
	res.setHeader('Access-Control-Allow-Origin', '*');
	fs.readdir(upfolder, (err, files) => {
	    files.forEach(file => {
		allfiles.push(file);
		
	    });
	    res.json(allfiles);
	    
	});
	
    }catch(er){
	console.log(er);
    }
});


router.get('/getbook/*', function(req,res){
    var decode = decodeURI(req.url);
    var star =  decode.lastIndexOf('/') + 1;
    var book = decode.substring(star);
    let upfolder = path.join(__dirname, '/../uploads');
    console.log(upfolder);
    try{ 
	res.setHeader('Content-disposition', 'attachment'); 
	res.setHeader('Access-Control-Allow-Origin', '*');
	var files = fs.createReadStream(upfolder +'/'+ book);
	files.pipe(res); // also you can set content-type
    }catch(er){
	console.log(er);

    }
    

});

router.post('/fileupload',function(req,res){
    // parse a file upload
    const form = formidable({ multiples: true });
    var begin = req.url.lastIndexOf('/') + 1;
    var sender = req.url.substring(begin);

    form.uploadDir = path.join(__dirname, '/../uploads');
    form.parse(req, (err, fields, files) => { 
        var oldpath = files.myFile.path ;
	var newpath= path.join(__dirname, '/../uploads/') + files.myFile.name ;
	try{
	    fs.rename(oldpath,newpath,function(err){
		if(err) {
		    console.log(err);
		    return;
		}
                // chat service here to confirm to chat server.
	 	console.log('uploaded ' + files.myFile.name);
                //chatservice.send('uploaded ' + files.myFile.name +":" +sender);
		res.setHeader('Access-Control-Allow-Origin', '*');
		
                res.send('done');
		
	    });
	    
	}catch(er){
	    console.log(er);
	}

    });
    

});

module.exports = router;
