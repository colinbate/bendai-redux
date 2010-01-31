// global debug function: safely print to console
function bdebug(msg) {
	(window.console) && console.log(msg);
}

var Bendai = function(scripts) {
	this.scriptUrl = '/js/';
	this.scripts = scripts;
	this.toString = function() {
		return "Bendai object";
	}
}

// Create authoritative bendai object.
var bendai = new Bendai(['player']);

// Used for visual notifications to the user.
Bendai.prototype.notify = function(title, msg, sticky) {
	$.gritter.add({'title':title,'text':msg});
}

Bendai.prototype.loadScript = function() {
	this._loadcount++;
	if (this._loadcount == this.scripts.length) {
		this.startGame();
	}
}

// Load the other bendai javascripts async.
Bendai.prototype.loadScripts = function() {
	bdebug('Loading scripts...');
	this._loadcount = 0;
	var surl = this.scriptUrl;
	var t = this;
	$.each(this.scripts, function(i,val){
		$.getScript(surl + val + '.js', $.proxy(t.loadScript, t));
	})
}

Bendai.prototype.startGame = function() {
	$(function(){
		// Start the game.
		bdebug('Starting game...');
		$('#loader').hide();
	});
}

$(function() {
	$('#loader img').click(function(){
		bendai.notify('Check', 'All is well here!');
	});
});

bendai.loadScripts();