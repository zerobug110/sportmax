jQuery(function($) {
	$("input.dynamicSearchBox").each(function() {
		var searchBox = $(this);
		searchBox.autocomplete({
			source: searchBox.data('autocompleteUrl')
		});
	});
});
