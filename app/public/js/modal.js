// 
//  modal.js
//  bendai
//  
//  Created by Colin Bate on 2010-02-06.
//  Bendai Project
// 

// Wrap in function to check for valid Bendai game object.
(function(Bendai,$){
	bdebug('Trying to load modal module.');
	if (undefined == Bendai || undefined == $) return;
	
	var formLoaded = function(mform, opts) {
		mform.find('form').ajaxForm({
			dataType: 'json',
			beforeSubmit: function(vals, f, afo) {
				var ret = true;
				if (opts.preSubmit) {
					ret = opts.preSubmit(mform, vals);
				}
				ret && $('#loader').show();
				return ret; 
			},
			success: function(data) { formSubmitted(mform, opts, data); }
		});
		if (opts.replace && mform.is(':visible')) {
			mform.find(':text:first').focus();
			opts.onOpen && opts.onOpen();
		} else {
			$('#nottopbar').block({message: null, onBlock: function(){
				mform.width(opts.width).center().css('zIndex', 2000).slideDown('normal', function(){
					mform.find(':text:first').focus();
					opts.onOpen && opts.onOpen();
				});
			}})
		}
	}
	
	var formSubmitted = function(mform, opts, data) {
		$('#loader').hide();
		if (data.form && !data.form.close) {
			if (data.form && data.form.message) {
				var $fsm = mform.find('.form-server-msg');
				if ($fsm.length > 0) {
					$fsm.html(data.form.message).wiggle();
				} else {
					$('<div/>')
						.addClass('form-server-msg')
						.html(data.form.message)
						.hide()
						.appendTo(mform)
						.fadeIn('normal');
				}
			}
			opts.onClose && opts.onClose(data)
		} else {
			if (data.form && data.form.message) {
				mform.html(data.form.message);
			}
			$.doTimeout('modalwindow.close', opts.autoHideDelay, function(){
				closeMW(mform, opts.onClose, data);
			})
			mform.click(function(){
				$.doTimeout('modalwindow.close', false);
			})
		}
		
		
	}
	
	var closeMW = function(mform, onClose, data) {
		mform.unbind('click');
		$('#nottopbar').unblock();
		mform.slideUp('normal', function(){
			onClose && onClose(data);
		})
	}
	
	var centerMe = function() {
		var x = ($(window).width() - this.width()) / 2;
		this.css({'left': x + 'px', 'top': '52px'});
		return this;
	}
	
	var ModalWindow = function() {
		this.$w = null;
		
		this.init = function($elem) {
			this.$w = $elem;
			this.$w.center = centerMe;
		}
		
		this.show = function(options) {
			if (this.$w == null) return;
			var opts = {
				width: 500,
				height: 'auto',
				url: undefined,
				html: undefined,
				onOpen: undefined,
				onClose: undefined,
				preSubmit: undefined,
				autoHideDelay: 1000,
				replace: false,
				blocking: false // Not sure how to do this ATM.
			}
			$.extend(opts, options);
			var mform = this.$w;
			if (strdefined(opts.url)) {
				mform.load(opts.url, function(){ formLoaded(mform, opts); });
			}
		}
		
		this.load = function(url, width, delay, onClose, preSubmit) {
			this.show({url: url, width: width, onClose: onClose, autoHideDelay: delay, preSubmit: preSubmit});
		}
		
		this.replace = function(url, delay, onClose, preSubmit) {
			this.show({url: url, onClose: onClose, autoHideDelay: delay, preSubmit: preSubmit, replace: true});
		}
		
	}
	// Singleton class member.
	Bendai.modalWindow = new ModalWindow();
	
})(Bendai,jQuery);