var bendai = window.bendai || {}
bendai.Characters = function() {
	
	var baseCharacter = function(name, max_hp) {
		this.name = name;
		this.max_hp = max_hp;
		this.hp = max_hp;
		
	}
	
	var Player = function(name, max_hp, type) {
		var that = new baseCharacter();
		that.type = type;
		return that;
	}
	
	return {
		GetNewPlayer: function(name, max_hp, type) {
			// create a new local player object.
			return new Player(name, max_hp, type);
		}
		
		GetSavedPlayer: function(player_id) {
			// fetch player data from the server.
		}
	}
	
}();
