(function($){
	
	//Create plugin obj
	$.fn.alert = function(options) {
		//Extend the default option obj
		$.fn.alert.defaults = $.extend({}, $.fn.alert.defaults, options);
		
		//Call addAlert method
		$.fn.alert.add();
		return this.each(function() {
			$(this).bind('click', function(e) {
				e.preventDefault();
				var ypos = e.pageY;
				$.fn.alert.trigger(ypos, $(this));
			});
		});
	}
	
	//Set up default options
	$.fn.alert.defaults = {
		alertBox: '#alert',
		message	: 'Are you sure?',
		link 	: '#',
		callback: 'callback'
	}
	
	//Inject alert html and bind event
	$.fn.alert.add = function() {
		//If the box doesnt exist, add it
		if ($($.fn.alert.defaults.alertBox).length == 0) {
			$('body').append('<div id="alert"><h3 class="message"></h3><p><a class="button cancel" href="#">Cancel</a><a class=" button continue" href="#">Continue</a></p>');
			$('.cancel', $.fn.alert.defaults.alertBox).bind('click', function(e) {
				e.preventDefault();
				$.fn.alert.remove();
			});
		}
	}
	
	//Remove alert box
	$.fn.alert.remove = function() {
		$($.fn.alert.defaults.alertBox).fadeOut('fast');
	}
	
	//Trigger alert box
	$.fn.alert.trigger = function(ypos, element) {
		var message = (element.attr('title') != '') ? element.attr('title') : $.fn.alert.defaults.message;
		var link = (element.attr('href') != '') ? element.attr('href') : $.fn.alert.defaults.link;
		$('.message', $.fn.alert.defaults.alertBox).text(message);
		$('.continue', $.fn.alert.defaults.alertBox).attr('href', link);
		$($.fn.alert.defaults.alertBox).css({top: ypos});
		$($.fn.alert.defaults.alertBox).fadeIn('fast');
	}
	
})(jQuery);