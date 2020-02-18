$(document).ready(function() {
	var button = '<div class="fb-like" data-href="'+window.location+'" data-width="200" data-layout="button_count" data-action="like" data-show-faces="false" data-share="false"></div>';
	$("#fb_button_div").append(button);
	$("#fb_button_div").fadeIn("fast");
});
