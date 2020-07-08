(function($) {
	$.fn.callJSONcontroller = function(form, loading, status, options) {
		var opts = $.extend({}, $.fn.callJSONcontroller.defaults, options);
		var form = $(form);
		var callAjax = function() {
			$.ajax({
				type: (form.attr('method') == '') ? 'get':form.attr('method'),
				url: form.attr('action'),
				data: form.serialize(),
				dataType: 'json',
				error: function() {
					$(loading).hide();
				},
				success: function(json) {
					$(loading).hide();
					if (json.status == 0) {
						$(status).removeClass(opts.errorClassName);
						$(status).addClass(opts.successClassName);
						$(status).html(json.successMessage);
						form.find('.'+opts.errorClassName).removeClass(opts.errorClassName);
					}
					else {
						$(status).removeClass(opts.successClassName);
						$(status).addClass(opts.errorClassName);
						$(status).html(json.errors);
						var errorHTML = '<ul class="remove-default">';
						$.each(json.errors, function(key, value) {
							form.find('[name='+key+'], [for='+key+']').addClass(opts.errorClassName);
							errorHTML += '<li>' + value + '</li>';
						});
						errorHTML += '</ul>';
						$(status).html(errorHTML);
					}
					if (opts.fade) {
						$(status).fadeIn(opts.fadeSpeed);
					}
					else {
						$(status).show();
					}
				}
			});
		};
		if (opts.fade) {
			$(loading).fadeIn(opts.fadeSpeed, callAjax);
		}
		else {
			$(loading).show();
			callAjax();
		}
		$(status).hide();
	};
	$.fn.callJSONcontroller.defaults = {
		errorClassName: 'error',
		successClassName: 'success',
		fade: true,
		fadeSpeed: 'slow'
	};
})(jQuery);