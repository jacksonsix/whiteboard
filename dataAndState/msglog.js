var logger ={

    books :[],
    loadnote: function loadnote(bookname,pagenum,note){
	this.connect(bookname,pagenum);
	return this.books[bookname][pagenum];
    },

    savenote: function savenote(bookname,pagenum,note){
        this.connect(bookname,pagenum);
	this.books[bookname][pagenum] += note;
	this.books[bookname][pagenum] +='\n';
	
    },
    connect: function connect(bookname,pagenum){
	if(this.books[bookname]){    
	}else{
	    this.books[bookname]=[];
	}
	if(this.books[bookname][pagenum]){
	}else{
	    this.books[bookname][pagenum]='';
	}
    },

    upload: function upload(){
	var data = JSON.stringfy(this.books);
	//
	ajax.push(data);
    },

    download: function download(){
	//var data from ajax
	this.books = JSON.parse(data);
    }

};

