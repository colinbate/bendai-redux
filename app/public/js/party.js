// 
//  party.js
//  bendai
//  
//  Created by Colin Bate on 2010-01-31.
//  Bendai Project
// 

// Wrap in function to check for valid Bendai game object.

(function(Bendai,$){
	bdebug('Trying to load party module.');
if (undefined == Bendai || undefined == $) return;

	var Party = function() {
		this.$e = undefined;
		this.name = '';
		this.players = [];
		
		this.AddPlayer = function(player) {
			if (!this.precheck()) return;
			this.players.push(player);
			$('<img>').attr('src', '/assets/sprites/' + player.sprite).appendTo(this.$e);
			$('<div>').appendTo(this.$e).html(player.name);
		};
		
		this.init = function($element, name) {
			this.$e = $element;
			this.name = name;
			if (strdefined(name)) {
				this.$e.find('h2').html(name);
			}
		}
		
		this.precheck = function() {
			if (!this.$e) {
				Bendai.showError('Party: not initialized.');
				return false;
			}
			return true;
		}
	}
	bdebug('Adding the party module to the game.');
	Bendai.prototype.party = new Party();
})(Bendai,jQuery);