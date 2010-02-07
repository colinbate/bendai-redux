// 
//  chat.js
//  bendai
//  
//  Created by Colin Bate on 2010-02-02.
//  Bendai Project
// 

// Wrap in function to check for valid Bendai game object.
(function(Bendai,$){
	bdebug('Trying to load chat module.');
	if (undefined == Bendai || undefined == $) return;
	
	var submitMessage = function() {
		this.parent.$output.addMessage(this.parent.$infield.val(), this.user.email);
		this.parent.$infield.val('');
	}
	
	var addMessage = function(msg, username) {
		username = username || 'System';
		$('<div>').html('<strong>&lt;' + username + '&gt;</strong> ' + msg).appendTo(this);
	}

	Bendai.prototype.setupChat = function() {
		this.$output.addMessage = addMessage;
		var t = this;
		Bendai.prototype.chat = {
			parent: t,
			system: sendSysMsg,
			sendMessage: submitMessage
		}
		this.$infield.keypress(function(ev){
			if (ev.keyCode == '13') {
				t.chat.sendMessage();
			}
		});
	}
	
	var sendSysMsg = function(msg) {
		this.parent.$output.addMessage(msg);
	}
	
})(Bendai,jQuery);