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
		var me = _converse.api.user.jid();
		me = me.substring(0,me.indexOf('@'));
		this.jid = me;
		var fromp = '';
		var top ='';
		//var domain = Strophe.getDomainFromJid(Hello.connection.jid);

		if(me ==='tom'){
		    fromp ='tom@whiteboard-k42jz';
		    top = 'jianlong@whiteboard-k42jz';
		}else{
		    top ='tom@whiteboard-k42jz';
		    fromp = 'jianlong@whiteboard-k42jz';
		}
		var msg = converse.env.$msg({from: fromp, to: top, type: 'chat'})
		    .c('body')
		    .t('$$$' + txt);
		_converse.api.send(msg);	
	
	    },
	    outmessage: onmessage,
	   
	};

    converse.plugins.add('myplugin', mplugin);
    converse.initialize({
        bosh_service_url: 'http://192.168.0.134:5280/bosh', // Please use this connection manager only for testing purposes
        show_controlbox_by_default: true,
	whitelisted_plugins: ['myplugin']
    });
    function onmessage(msg){
	console.log(msg);
    }
