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
		this.$output.addMessage(this.$infield.val(), this.user);
		this.$infield.val('');
	}
	
	var addMessage = function(msg, username) {
		username = username || 'System';
		$('<div>').html('<strong>&lt;' + username + '&gt;</strong> ' + msg).appendTo(this);
	}

	Bendai.prototype.setupChat = function() {
		this.$output.addMessage = addMessage;
		Bendai.prototype.submitChatMessage = submitMessage;
		var t = this;
		this.$infield.keypress(function(ev){
			if (ev.keyCode == '13') {
				t.submitChatMessage();
			}
		});
	}
	
})(Bendai,jQuery);