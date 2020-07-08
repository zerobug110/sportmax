(function($) {
	//
	// plugin definition
	//
	$.fn.rollover = function(options) {
		//debug(this);
		// build main options before element iteration
		var opts = $.extend({}, $.fn.rollover.defaults, options);
		return this.each(function() {
			var $this = $(this);
			var assignRollover = function($trigger,opts){
				var overlaySelector = '.' + opts.className;
				var contentSelector = '.' + opts.contentClassName;
				var rolloverDiv = $('<div class="'+opts.className+'"/>')
				
				if (typeof(opts.distanceFromTop) == "function"){
					var distanceFromTheTopValue=opts.distanceFromTop($trigger,opts);
				}else{
					var distanceFromTheTopValue=opts.distanceFromTop;
				}
				var rolloverStyle = {
					'position' : 'absolute',
					'text-align' : 'center',
					'z-index' : '100',
					'display' : 'none',
					'height' : opts.height - 10,
					'width' : opts.width,
					'margin-top' : distanceFromTheTopValue,
					'cursor' : 'pointer'
				};
				rolloverDiv.css(rolloverStyle);
				$this.prepend(rolloverDiv);
				rolloverDiv.append($trigger.find(contentSelector));
				$trigger.hover(
					function() {
						//$(this).find('img').fadeTo('fast', opts.fadeTo, function() {
							$trigger.find(overlaySelector).show().children().show();
						//});
					},
					function() {
						//$(this).find('img').fadeTo('fast', 1, function() {
							$trigger.find(overlaySelector).hide();
						//});
					}
				);
			};
			var $thisImages = $this.find('img');
			//most triggers have single image, if more than 1 image in trigger the code below might require adjustments 
			if ($thisImages.size()!=1|| !!$thisImages.get(0).complete ||  (typeof $thisImages.get(0) != "undefined"  && $thisImages.get(0).naturalWidth != 0)){
				assignRollover($this,opts);
			}else{
				var $image = $($thisImages.get(0));
				var isExecuted = false;
				var delayTimes=0;
				var fallback;
				var delayFunction = function(){
					if (delayTimes >= 3 || !!$image.get(0).complete ||  (typeof $image.get(0) != "undefined"  && $image.get(0).naturalWidth != 0)){
						isExecuted=true;
						assignRollover($this,opts);
					}else{
						fallback =  setTimeout(delayFunction,2000);
						delayTimes++;
					}
				}; 
				
				$image.load(function(){
					if (!isExecuted){
						assignRollover($this,opts);
						clearTimeout(fallback);
					}
				});
				fallback =  setTimeout(delayFunction,2000);
			}
		});
	};
	//
	// private function for debugging
	//
	function debug($obj) {
		if (window.console && window.console.log)
		window.console.log('rollover selection count: ' + $obj.size());
	};
	//
	// plugin defaults
	//
	$.fn.rollover.defaults = {
		fadeTo:1,
		height: 30,
		width: 167,
		fontSize: 12,
		className: 'overlay',
		contentClassName: 'rolloverlink',
		distanceFromTop:function($overlay,opts){return ($overlay.height() / 2) - (opts.height / 2)}
	};
	//
	// end of closure
	//
})(jQuery)
