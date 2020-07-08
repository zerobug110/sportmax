(function($) {
	$.fn.minicart = function(params) {
		if(params) {
			params += "&componentName=mini-cart-totals";
		} else {
			params = "componentName=mini-cart-totals";
		}
		$.get('/MiniCartTotals', params, function(data) {
		     $('#minicart-header').replaceWith(data);
		});
	};
})(jQuery);

$(function(){
	var minicart = $('#minicart-header, #minicart');
	minicart.hover(
		function(){ // mouseover
			minicart.addClass('active');
		},
		function(){ // mouseout
			minicart.removeClass('active'); 
		}
	);
});