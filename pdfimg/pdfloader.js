function viewpage(pagenumber){
    pdfloader.pdfobject.getPage(pagenumber).then(function(page) {
	var scale = 1.5;
	var viewport = page.getViewport({ scale: scale, });

	//
	// Prepare canvas using PDF page dimensions
	//
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');
	canvas.height = viewport.height;
	canvas.width = viewport.width;

	//
	// Render PDF page into canvas context
	//
	var renderContext = {
	    canvasContext: context,
	    viewport: viewport,
	};
	page.render(renderContext);
    });
}
function getFile(name){
    var url = pdfloader.baseurl + name;
    var loadingTask = pdfjsLib.getDocument(url);
    loadingTask.promise.then(function(pdf) {
	
	pdfloader.pdfobject = pdf;
	viewpage(1);
    });
}


function runOnce(){
    pdfjsLib.GlobalWorkerOptions.workerSrc = pdfloader.workerSrc;
    
}
var pdfloader ={
    getFile:getFile,
    viewpage:viewpage,
    workerSrc:'',
    runOnce:runOnce,
    workerSrc:{},
    baseurl:''
};
