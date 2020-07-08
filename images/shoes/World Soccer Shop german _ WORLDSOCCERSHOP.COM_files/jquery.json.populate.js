(function($) {
	$.fn.populate = function(json, options) {
		options = $.extend({mobile: false, prefix: ''}, options);
		var data = $.parseJSON(json);
		return this.each(function() {
			var form = $(this);
			$.each(data, function(name, value) {
				var buttons = form.find('button[name="' + options.prefix + name + '"]'),
					textAreas = form.find('textarea[name="' + options.prefix + name + '"]'),
					inputs = form.find('input[type!=checkbox][type!=radio][name="' + options.prefix + name + '"]'),
					checks = form.find('input[type=checkbox][name="' + options.prefix + name + '"],input[type=radio][name="' + options.prefix + name + '"]'),
					selects = form.find('select[name="' + options.prefix + name + '"]'),
					vals = value.constructor == Array ? value : [value];
				checks.prop('checked', false);
				selects.find('option').prop('selected', false);
				$(vals).each(function(i, val) {
					buttons.val(val);
					textAreas.val(val);
					inputs.val(val);
					var matchedChecks = checks.filter('[value="' + val + '"]'), 
						matchedOptions = selects.find('option[value="' + val +'"]');
					if(matchedChecks.length == 0) {
						// Handle cases where data is represented as a boolean binary but set as a normal boolean in the form element
						if(val == '0') {
							checks.filter('[value=false]').prop('checked', true);
						} else if(val == '1') {
							checks.filter('[value=true]').prop('checked', true);
						}
					} else {
						matchedChecks.prop('checked', true);
					}
					if(matchedOptions.length == 0) {
						// Handle cases where data is represented as a boolean binary but set as a normal boolean in the form element
						if(val == '0') {
							selects.find('option[value=false]').prop('selected', true);
						} else if(val == '1') {
							selects.find('option[value=true]').prop('selected', true);
						}
					} else {
						matchedOptions.prop('selected', true);
					}
				});
			});
			// Needed if using jQuery Mobile
			if(options.mobile) {
				form.find('input[type=checkbox],input[type=radio]').checkboxradio("refresh");
				form.find('select').selectmenu("refresh");
			}
			form.find('input, select, textarea').change();
		});
	};
})(jQuery);