// Requires agile_carousel.alpha.js to also be included on the page, as that drives the carousel.  

$('html').delegate('div[data-role=page]', 'pageinit', function(evt) {
	
	$(".carousel").each(function() {
		var carouselParams = new Array();
		$(this).find('.carouselContent').each(function(index) {
			carouselParams[index]={"content" : "<div unselectable='on' class='slide_inner'>"+$(this).html()+"</div>"};
		});
		
		var visible_slides = $(this).data('carousel-slide-num') != null ? parseInt($(this).data('carousel-slide-num')) : 1;
		var page_controls = $(this).data('carousel-page-controls') != null ? $(this).data('carousel-page-controls') : "content_buttons";
		var carousel = $(this).agile_carousel({
	        carousel_data: carouselParams,
	        carousel_outer_width: window.innerWidth-30,
	        transition_time: 300,
	        timer: 4000,
	        continuous_scrolling: true,
	        control_set_1: page_controls,
	        number_slides_visible: visible_slides
		});

		$(this).closest("div.slide-nav-wrapper").SlideNavigator({
			current:0,
			itemsCount:carouselParams.length,
			continuous_scrolling: true,
			onPrevClick:function() {
				carousel.find("div.agile_carousel").swiperight();
			},
			onNextClick:function() {
				carousel.find("div.agile_carousel").swipeleft();
			}
		});

	});

});