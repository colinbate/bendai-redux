// 
//  bendai.js
//  bendai
//  
//  Created by Colin Bate on 2010-01-30.
//  Bendai Project
// 

// global debug function: safely print to console
function bdebug(msg) {
	(window.console) && console.log(msg);
}

function strdefined(v) {
	return (v != undefined && v != '');
}

var Bendai = function(scripts) {
	this.scriptUrl = '/js/';
	this.scripts = scripts;
	this.toString = function() {
		return "Bendai object";
	}
}

// Create authoritative bendai object.
var bendai = new Bendai([
	'user'
	,'player'
	,'party'
	,'chat'
	,'modal'
	]);

// Used for visual notifications to the user.
Bendai.notify = function(title, msg, sticky) {
	$.gritter.add({'title':title,'text':msg});
}

Bendai.showError = function(msg) {
	Bendai.notify('Error', msg);
}

Bendai.prototype.loadScript = function() {
	this._loadcount++;
	if (this._loadcount == this.scripts.length) {
		$($.proxy(this.startGame, this));
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
	// Start the game.
	bdebug('Starting game...');
	
	// Set DOM components.
	this.$ga = $('#gamearea');
	this.$input = $('#bendai-input');
	this.$infield = $('#bendai-input-field');
	this.$output = $('#bendai-output');
	this.$party = $('#bendai-party');
	this.$enemies = $('#bendai-enemies');
	this.$menu = $('#bendai-menu');
	this.$modal = $('#bendai-modal');
	Bendai.modalWindow.init(this.$modal);
	
	// Fill browser window. And ensure it stays full.
	this.arrangeScreen();
	var myself = this;
	$(window).resize(function(){
		$.doTimeout('resizescreen', 250, $.proxy(myself.arrangeScreen, myself));
	})
	
	// Get rid of the loading indicator.
	$('#loader').fadeOut();
	
	this.setupChat();
	this.user.addLoginListener($.proxy(this.loadGameData, this));
	this.user.loginPrompt();
}

Bendai.prototype.loadGameData = function(user) {
	if (!user.isLoggedIn()) return;
	Bendai.notify('Logged in', user.email + ' just logged in.');
	this.loadParty();
	
	
	// Load a demo sprite for the enemy.
	$('<img>').attr('src', '/assets/sprites/ogre.gif').load(function(){
		$t = $(this);
		$t.width($t.width()*2);
	}).appendTo(this.$enemies);
}

Bendai.prototype.arrangeScreen = function() {
	// Find the available height for the game area and adjust.
	var gaheight = $(window).height() - this.$ga.offset().top - 5;
	this.$ga.height(gaheight);
	this.$party.height(gaheight-2);
	
	// Find height available for the chat/game output.
	var leftheight = this.$enemies.outerHeight(true) + this.$output.outerHeight(true) + this.$input.outerHeight(true);
	this.$output.height(this.$output.height() + (gaheight - leftheight));
}

Bendai.prototype.loadParty = function() {
	bdebug('Loading party.');
	this.party.init(this.$party, 'My Party');
	if (this.party == undefined) {
		bdebug('Party module not loaded.');
		return;
	}
	// Testing adding players.
	this.party.AddPlayer(this.Characters.GetNewPlayer('CALL', 100, 'fighter'));
	this.party.AddPlayer(this.Characters.GetNewPlayer('ADAM', 95, 'blackbelt'));
	this.party.AddPlayer(this.Characters.GetNewPlayer('DEEN', 90, 'whitemage'));
	this.party.AddPlayer(this.Characters.GetNewPlayer('COOL', 90, 'blackmage'));
	
}

bendai.loadScripts();