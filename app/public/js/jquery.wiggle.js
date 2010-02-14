(function($){
	$.fn.wiggle = function(fn, distance, speed) {
		distance = distance || 10;
		var x2 = distance * 2;
		speed = speed || 200;
		this.css('position', 'relative').animate({
			left: '-='+distance
		}, speed).animate({
			left: '+='+x2
		}, speed).animate({
			left: '-='+x2
		}, speed).animate({
			left: '+='+distance
		}, speed, 'swing', fn);
		//this.fadeOut(speed).fadeIn(speed).fadeOut(speed).fadeIn(speed);
	}
})(jQuery);