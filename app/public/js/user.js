// 
//  user.js
//  bendai
//  
//  Created by Colin Bate on 2010-02-06.
//  Bendai Project
// 

// Wrap in function to check for valid Bendai game object.
(function(Bendai,$){
	bdebug('Trying to load user module.');
	if (undefined == Bendai || undefined == $) return;
	
	var verifyLogin = function(user, data) {
		if (data.success) {
			user.session_id = data.session_id;
			user.session_start = data.session_start;
			user.email = data.email;
			user.logged_in = true;
		}
		$.each(user.notify_list, function(k,v){ v(user); })
	}
	
	var User = function() {
		this.session_id = null;
		this.session_start = null;
		this.email = null;
		this.logged_in = false;
		this.notify_list = [];
		
		this.addLoginListener = function(fn) {
			this.notify_list.push(fn);
		}
		
		this.loginPrompt = function() {
			var myself = this;
			Bendai.modalWindow.load('/game/ui/login', 400, 2000, function(data) { verifyLogin(myself, data); });
		}
		
		this.isLoggedIn = function() {
			return this.logged_in;
		}
	}
	// Singleton.
	Bendai.prototype.user = new User();
	
})(Bendai,jQuery);