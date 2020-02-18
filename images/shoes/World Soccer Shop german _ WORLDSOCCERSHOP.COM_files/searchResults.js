$(function() {
	$('select.resultsPerPage').change(function() {
		var search = location.search.replace(/[?&]page=(\d*)/, '').replace(/[?&]pageSize=(\d*)/, '');
		if(search.length == 0) {
			search += '?';
		} else {
			search = '?' + search.substring(1) + '&';
		}
		window.location = location.pathname + search + 'pageSize=' + $(this).val();
	});

	$('a.quickview').noContext(); //prevents the user from opening in a new window
	$('a.quickview').each(
			function(){
				var $anchor = $(this);
				//provide if url cannot be  served as stand alone page( happens on mouse middle click)
				var popupURL = $anchor.data('popupurl');
				if (!popupURL){
					popupURL = $anchor.attr('href')
				}
				$anchor.colorbox({
					opacity: .3
					, scrolling: false
					, maxWidth: '100%'
					, innerWidth: '700'
					, href: popupURL
					, onComplete: function() {
						$.colorbox.resize({
							innerWidth: $('#quick-view').width()	
						});
						try {
							cmCreatePageViewEvent({pagename:$('#quick-view .product-title').text() + ' - ' + $(this).text()});
						} catch(e) {}
					}
				})
			}
	);

	$('form.search').submit(function(){
		var searchField = $(this).find('input[name="query"]');
		var combinedQuery = queryObj()['query'].replace(/\+/g,' ');
		combinedQuery += ' ' + searchField.val();
		searchField.val(combinedQuery.trim());
	});
	$('.rollovertrigger').rollover({
		width:'150'
		,distanceFromTop:function($overlay,opts){return ($overlay.height()) - (opts.height)-20}
		,contentClassName: 'rollovercontent'
	});
	
	$(".facetCheckbox").click(function() {
		//clicking a facet checkbox
		var facetUrl = $(this).parent().attr("href");
		window.location = facetUrl;
	});
	
	if($('div#colorSearchFacet').length > 0) {
		//when page loads with a color facet selected, change all images to be that color
		var imagesToChange = $('.product-list img.productImage');
		imagesToChange.removeAttr('src');
		var colorFacetValue = $('div#colorSearchFacet').data("color-search-facet");
		imagesToChange.each(function() {
			$(this).attr("data-color","&c=" + colorFacetValue);
			var newSrc = $(this).attr('data-baseimage') + 
					$(this).attr('data-size') + 
					$(this).attr('data-imageindex') + 
					$(this).attr('data-color') + 
					$(this).attr('data-addlparams') ;
			$(this).attr('src', newSrc);
		});
		imagesToChange.show();
	}
	
	if($('div#colorSearchFacet').length > 0) {
		//when page loads with a color facet selected, change all images to be that color
		var imagesToChange = $('.product-list img.productImage');
		imagesToChange.removeAttr('src');
		var colorFacetValue = $('div#colorSearchFacet').data("color-search-facet");
		imagesToChange.each(function() {
			$(this).attr("data-color","&c=" + colorFacetValue);
			var newSrc = $(this).attr('data-baseimage') + 
					$(this).attr('data-size') + 
					$(this).attr('data-imageindex') + 
					$(this).attr('data-color') + 
					$(this).attr('data-addlparams') ;
			$(this).attr('src', newSrc);
		});
		imagesToChange.show();
	}
});