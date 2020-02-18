$(function(){
	$(document).on('submit','form#emailSignupFormAjax',function(e){
		e.preventDefault();
		form = $(this);
		var container = $(this).closest('#email-signup-form-div');
		form.find('input, button, .input-text, .error-message').hide();
		form.find('.emailSignUpMsg .loading-message').show();
		$.post(form.attr('action'), form.serialize(), function(data){
			container.html(data);
		});
	});
})