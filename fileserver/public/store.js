//store data in web storage window.sessionStorage
// window.sessionStorage.setItem(name,val)
// window.sessionStorage.getItem(name)

// name =   table + i  row, + clumn j
// metadata   table name, colum name

// design row, clumn
//  data structure as row, then insert to cell 

function initdb(){
    let store = window.sessionStorage;
    function storedb(){
	
	function getStore(){	
		return store;
	}
	function add(name,value){
		store.setItem(name,value);
	}
	function del(name){
		store.removeItem(name);	
	}
	function update(name,value){
		store.setItem(name,value);
	}

	function get(name){
		return store.getItem(name);
	}
        function allStorage(store) {

	    var values = [],
		keys = Object.keys(store),
		i = keys.length;

	    while ( i-- ) {
		values.push( store.getItem(keys[i]) );
            }

          return values;
        }
        function containsPoint(x,y){
	    let elist =[];
	    let db = allStorage(store);
	    db.forEach(function(e){
		let element = document.getElementById(e);
		if(element ===null) return;
		left = element.offsetLeft;
		topY = element.offsetTop;
		width = element.offsetWidth;
		height = element.offsetHeight;
		if( left < x && x < left+width && topY < y && y < topY + height){
		    elist.push(e);
		}
	    });
	    return elist;
	}

        function getYrange(low,high){

        }

	return {
	    "add":add,
	    "del":del,
	    "update":update,
	    "get":get,
	    "containsPoint":containsPoint
	}

    }
    return storedb;
}



function genUrl(domain,name){
	return domain + '/' + name;		
}



