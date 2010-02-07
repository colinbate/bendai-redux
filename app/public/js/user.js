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
	
	var email_regex = /^[a-z0-9._%+-]+@(?:[a-z0-9-]+\.)+[a-z]{2,4}$/i;
	
	var validateLoginForm = function(mform) {
		var $email = $('input[name=email]', mform);
		var $pwd = $('input[name=pwd]', mform);
		var ret = true;
		if (email_regex.test($email.val())) {
			$email.prev().removeClass();
		} else {
			$email.prev().removeClass().addClass('validate-fail');
			$('<span>').html('Email not properly formatted.').appendTo($email.prev());
			ret = false;
		}
		
		if ($pwd.val() == '') {
			$pwd.prev().removeClass().addClass('validate-fail');
			$('<span>').html('Please enter a password.').appendTo($pwd.prev());
			ret = false;
		} else {
			$pwd.prev().removeClass();
		}
		return ret;
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
			Bendai.modalWindow.load('/game/ui/login', 400, 2000, function(data) { verifyLogin(myself, data); }, validateLoginForm);
		}
		
		this.isLoggedIn = function() {
			return this.logged_in;
		}
	}
	// Singleton.
	Bendai.prototype.user = new User();
	
})(Bendai,jQuery);