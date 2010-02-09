// 
//  world.js
//  bendai
//  
//  Created by Colin Bate on 2010-01-31.
//  Bendai Project
// 

// Wrap in function to check for valid Bendai game object.
(function(Bendai,$){
	bdebug('Trying to load world module.');
	if (undefined == Bendai || undefined == $) return;

	// This object will define a game world.
	var World = function(game_id) {
		
	}
	
	// Loaded game data coming back from server.
	var loadGame = function(data, bendai) {
		
	}
	
	var newGame = function(data, bendai) {
		
	}
	
	var validateNewGame = function(mwin, vals, bendai) {
		
	}
	
	// Check before the submission takes place to see if a new game was chosen.
	var checkForNewGame = function(mwin, vals, bendai) {
		var newgame = false;
		for (i=0;i<vals.length;i++) {
			if (vals[i].name == 'choice') {
				if (vals[i].value == 'New Game') {
					newgame = true;
				}
				break;
			}
		}
		//var $choice = mwin.find('input[name=choice]');
		//bdebug('Choice: ' + $choice.val() + ' length: ' + $choice.length);
		if (newgame) {
			bdebug('Loading create character UI...');
			Bendai.modalWindow.replace('/game/ui/create-character', 2000, 
										function(data){newGame(data,bendai)},
										function(mwin,vals){validateNewGame(mwin,vals,bendai)});
			return false;
		}
	}
	
	var chooseGame = function(user) {
		if (!user.isLoggedIn()) return;
		var b = this;
		Bendai.modalWindow.load('/game/ui/choose-game', 400, 2000,
								function(data){loadGame(data, b);},
								function(mwin, vals){checkForNewGame(mwin,vals,b);});
	}
	
	Bendai.prototype.chooseGame = chooseGame;
	Bendai.prototype.game = {loaded: false}; // Add this for now to avoid null reference exceptions.
	
})(Bendai,jQuery);