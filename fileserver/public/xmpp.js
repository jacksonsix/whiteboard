	const mplugin =  {
	    _converse: null,
	    _super:null,
	    jid:'',
	    initialize: function () {
		_converse = this._converse;
		_converse.api.listen.on('message', obj => {
		    this.outmessage(obj.stanza.innerHTML); 
		});
       
	    },
	    overrides: {
		ChatBoxView: {                
                    showMessage: function (attrs) {
			if(attrs.attributes['message'] &&  attrs.attributes['message'].substring(0,3) !=='$$$'){
			    this.__super__.showMessage(attrs);
			}
		
                    }
		}
            },
	    send: function(txt){
		var curjid = _converse.api.user.jid();
		me = curjid.substring(0,me.indexOf('@'));
		this.jid = me;
		var fromp = '';
		var top ='';
		//var domain = Strophe.getDomainFromJid(Hello.connection.jid);
		
		top ='chat1@conference.readbook.eastus.cloudapp.azure.com';
		fromp = curjid;
		
		var msg = converse.env.$msg({from: fromp, to: top, type: 'groupchat'})
		    .c('body')
		    .t('$$$' + txt);
		_converse.api.send(msg);	
		
	    },
	    outmessage: onmessage,
	    
	};

    converse.plugins.add('myplugin', mplugin);
    converse.initialize({
        bosh_service_url: 'http://readbook.eastus.cloudapp.azure.com:5443/bosh', // Please use this connection manager only for testing purposes
        //websocket_url: 'ws://readbook.eastus.cloudapp.azure.com:5443/ws/',
	auto_join_rooms: [{'jid': 'chat1@conference.readbook.eastus.cloudapp.azure.com', 'minimized': true }],
	show_controlbox_by_default: true,
	whitelisted_plugins: ['myplugin']
    });
    function onmessage(msg){
	console.log(msg);
    }
