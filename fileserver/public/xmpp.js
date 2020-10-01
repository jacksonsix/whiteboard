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

		if(me ==='demi'){
		    fromp ='demi@readbook.eastus.cloudapp.azure.com';
		    top = 'jianlong@readbook.eastus.cloudapp.azure.com';
		}else{
		    top ='demi@readbook.eastus.cloudapp.azure.com';
		    fromp = 'jianlong@readbook.eastus.cloudapp.azure.com';
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
        bosh_service_url: 'http://readbook.eastus.cloudapp.azure.com:5443/bosh', // Please use this connection manager only for testing purposes
        show_controlbox_by_default: true,
	whitelisted_plugins: ['myplugin']
    });
    function onmessage(msg){
	console.log(msg);
    }
