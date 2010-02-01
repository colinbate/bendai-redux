// 
//  player.js
//  bendai
//  
//  Created by Colin Bate on 2010-01-30.
//  Bendai Project
// 
(function(Bendai){
if (undefined == Bendai) return;
bdebug('Loading player module.');
// Define character functionality.
Bendai.prototype.Characters = function() {
	
	var baseCharacter = function(name, max_hp) {
		this.name = name;
		this.max_hp = max_hp;
		this.hp = max_hp;
		this.sprite = '';
	}
	
	var player_sprites = {
		'fighter': 'fifight.gif',
		'blackbelt': 'bbfight.gif',
		'blackmage': 'bmfight.gif',
		'whitemage': 'wmfight.gif'
	}
	
	var Player = function(name, max_hp, type) {
		var that = new baseCharacter(name, max_hp);
		that.type = type;
		that.sprite = player_sprites[type];
		return that;
	}
	
	return {
		GetNewPlayer: function(name, max_hp, type) {
			// create a new local player object.
			return new Player(name, max_hp, type);
		},
		
		GetSavedPlayer: function(player_id) {
			// fetch player data from the server.
		}
	}
	
}();
})(Bendai)