$(function() {
	// Redirects user to UserTimeoutView when there is a session timeout during an AJAX request
	$.ajaxSetup({
		error: function(jqXHR, textStatus) {
			if(jqXHR) {
				var statusCode = jqXHR.status;
				if (statusCode == 401) {
					window.location = "/user/re-login.html";
				}
			}
		}
	});
	
	if($('#recentlyViewed').find('li').length > 0) {
		$('#recentlyViewedLinkCat, #recentlyViewedLink').show(0);
		$('#recentlyViewed').show(0);
	}
	
	if($('#crossSell').find('li').length > 0) {
		$('#crossSell').show(0);
	}
	
	$(document).on('change', 'select[name="primaryCardBrand"]', function(e){
		if ($('select[name="primaryCardBrand"]').val() == "AMEX") {
			$('#security-code-verify').show();
		} else {
			$('#security-code-verify').hide();
		}
	});
	
	$.fn.setupColorbox = function() {
		$('a.lightbox').noContext(); //prevents the user from opening in a new window
		$('a.lightbox').colorbox({
			opacity: .3
			, scrolling: false
			, maxWidth: '100%'
			, onComplete: function() {
				if ($('#quick-view').length && $('#quick-view').width() > 0) {
					$.colorbox.resize({
						innerWidth: $('#quick-view').width()
					});
				} else {
					$.colorbox.resize();
				}
			}
		});
	}
	$.fn.setupColorbox();
	$(document).bind('cbox_complete', function() {
		var href = $.colorbox.element().attr('href');
		if(href) {
			// Google Analytics: track as virtual pageviews
			try {
				_gaq.push(['_trackPageview', href]);
			} catch(ex) {}
		}
	});
	$('.print-link').click(function(event) {
		event.preventDefault();
		window.print();
	});
	
	$('.rolloverElement').rollover({
		distanceFromTop:function($overlay,opts){return (opts.height / 2) - (opts.fontSize / 2)}
		
	});
	
	//Set up QAS address verification
	var isNewAddress = function() {
		return $('#newAddressInput').length == 0 || $('#newAddressInput:checked').length != 0;
	}
	
	$('form.address-form').addressVerify({
		'triggerEvent':'doVerification',
		'validationProgressCallback': function(promise){
			var $this = $(this);
			$this.find('.avInProgress').show();
			promise.always(function(){$this.find('.avInProgress').hide();});
		},
		'successCallback':function() { $(this).submit(); }
	});
	
	var isCreatingAccount = function() {
		return document.getElementById('register').checked;
	}
	//Set up address form validation
	$.validator.addClassRules({
		'nick-name': { required: function() {return isNewAddress();} },
		'first-name': { required: function() {return isNewAddress();} },
		'last-name': { required: function() {return isNewAddress();} },
		'address-line-1': { required: function() {return isNewAddress();} },
		'address-city': { required: function() {return isNewAddress();} },
		'address-country': { required: function() {return isNewAddress();} },
		'address-state': { required: function() {return isNewAddress();} },
		'address-zip': { required: function() {return isNewAddress();} },
		'phone-number': { required: function() {return isNewAddress();} },
		'email-address': { required: function() {return isNewAddress();} },
		'verify-email': { required: function() {return isNewAddress() && isCreatingAccount();} },
		'logon-password': { required: function() {return isNewAddress() && isCreatingAccount();} },
		'verify-password': { required: function() {return isNewAddress() && isCreatingAccount();} }
	});
	
	$('form.address-form').validate({
		'onkeyup': false,
		'submitHandler': function(form) {
			if(validateDOB($("input[name=birthdate]"),0)){	
			//Call QAS if form is valid
				if(!isNewAddress() &&  $(form).addressVerify('verificationComplete') != -1){
					var addrCountry = $('input:radio[name=addressId]:checked').attr('data-country');
					if(addrCountry == "US" || addrCountry == "CA") {
						$(form).trigger('doVerification');
						return;
					} else {
						form.submit();
					}
				}
				if(!isNewAddress() || $(form).addressVerify('verificationComplete') == -1) {
				form.submit();
			} else {
				var addrCountry = document.getElementById('personal-info-country').value;
				if(addrCountry == "US" || addrCountry == "CA") {
					$(form).trigger('doVerification');
				} else {
					form.submit();
				}
			}
		}
	}
	});


	$('form').on('change', 'input[name="birthdate"]', function() {
		validateDOB($("input[name=birthdate]"),0);
	});
	
	
	/*$('form').on('change', 'input[name="dateOfBirth"]', function() {
		validateDOB($("input[name=dateOfBirth]"),18);
	});*/
	
	 function validateDOB(dobField,age){
		 $("#personal_info_birthdate_error").remove();
		 dob=dobField.val();
		 if(dob!=null && dob!=''){
			 var values=dob.split("/");
			 var month = Number(values[0])-1;
			 var day = Number(values[1]);
			 var year = Number(values[2]);
	
			 var cutOffDate = new Date(year + age, month, day);
			 if (cutOffDate > Date.now()) {
			     var errorMessage = "<label id='personal_info_birthdate_error' class='error' style='color:red'>Invalid date.</label>";
			     dobField.parent().prepend(errorMessage)
			     dobField.val("");
			     return false;
			 } else {
			     return true;
			 }
		 }else{
			 return true;
		 }
	 }

	
	$('form').on('blur', 'input[name="city"]', function() {
		var input = $(this);
		input.val(input.val().replace(new RegExp('[^' + input.data('regex') + ']', 'gi'), ''));
	});
	
	//prevent invalid chars in message, to and from fields for gift cards
	$('form').on('blur', 'input[name^="toName"], input[name^="fromName"], textarea[name^="message"]', function() {
		var input = $(this);
		input.val(input.val().replace(new RegExp('[^a-zA-Z0-9!"#$%&\\\'()*+,\\-./:;<=>?@[\\]_\\^~\\s]', 'gi'), ''));
	});
	
	$('ul.user-menu').on('change', '#header-player-select, #header-club-admin-select', function() {
		if($(this).val() != "") {
			window.location = $(this).val();
		}
	});
	
	$('.accordion').click(function(event) {
		$(this).toggleClass('active');
		$(this).next('.panel').toggle();
	});
	
	//Tablet optimization
    if ('ontouchstart' in document.documentElement) {
        //Styling fixes
        var $window = $(window);
        var $body = $("body");
        $body.addClass("tablet-opt");
        $("div#rightnav").css({"overflow-x":"hidden","margin-left": "auto"});
        var optWidth = $("div#wrapper").outerWidth(true);
        $("div#header").css({"width":optWidth});
        $("div#footer").css({"width":optWidth});
        $("div#wrapper").css({"overflow-x":"hidden"});

        //QuickView fixes
        var resizeOverlay = function() {
            $("div#cboxOverlay").css({width: Math.max($window.width(), $body.innerWidth()),
                height: Math.max($window.height(), $body.innerHeight()),
                top: 0, left: 0});
        }
        resizeOverlay();
        $(window).bind('resize', resizeOverlay);

        if (navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)/i)) {

        } else {

            //Hover menu fixes
            var clearSecondClickFlag = function() {
                $('a.__second-click').attr("__clicked", "false");
            }

            var onLinkClick = function(event) {
                if ($(this).attr("__clicked") !== "true") {
                    clearSecondClickFlag();
                    $(this).attr("__clicked", "true");
                    event.preventDefault();
                    event.stopPropagation();
                    event.stopImmediatePropagation();
                    event.stopped = true;
                    return false;
                }
                return true;
            }

            $('div#header ul.menu-links > li > a').filter(
                function() {
                    return $(this).parent().find("ul").length;
                }).addClass("__second-click");

            clearSecondClickFlag();
            $('a.__second-click').on('click', onLinkClick);
            $(document).on('click', clearSecondClickFlag);
        }
    }

    $.fn.minicart();
    
    if($('a#clubInfo').length) {
	    $.get($('a#clubInfo').attr('href'), function(data) {
	    	var responseElements = $(data);
	    	if (responseElements.is('ul.club-info')) {
	    		responseElements.find('li').appendTo('ul.user-menu');
	    	}
	    });
    }
    
    if($('#crossSell').find('li').length > 0) {
		$('#crossSell').show(0);
	}
    
    $(document).on('change', 'select[name="primaryCardBrand"]', function(e){
		if ($('select[name="primaryCardBrand"]').val() == "AMEX") {
			$('#security-code-verify').show();
		} else {
			$('#security-code-verify').hide();
		}
	});
});

function imagePop (url, name, options) {
	var w = window.open(url, name, options);
	w.focus();
	return false;
}

function scrubLetter(v) {
	var Regex = new RegExp("^[A-Za-z .'\u00C0\u00C1\u00C8\u00C9\u00D1-]+$");
	if( !v.match( Regex ) ) {
		newText = new Array(v.length);
		for (i=0; i<newText.length; i++) {
				if(v.charAt(i).match( Regex )) {
					newText[i] = v.charAt(i);
				}
		}
		newValue = newText.join('');
		return newValue;
	} else {
		return v;
	}
}

function scrubNumber(v) {
	var Regex = new RegExp("^[0-9]+$");
	if( !v.match( Regex ) ) {
		newText = new Array(v.length);
		for (i=0; i<newText.length; i++) {
			if(v.charAt(i).match( Regex )) {
				newText[i] = v.charAt(i);
			}
		}
		newValue = newText.join('');
		return newValue;
	} else {
		return v;
	}
}

function scrubAlphaNum(v) {
	var Regex = new RegExp("^[A-Za-z0-9 -]+$");
	if( !v.match( Regex ) ) {
		newText = new Array(v.length);
		for (i=0; i<newText.length; i++) {
			if(v.charAt(i).match( Regex )) {
				newText[i] = v.charAt(i);
			}
		}
		newValue = newText.join('');
		return newValue;
	} else {
		return v;
	}
}

var queryObj = function() {
	var result = {}, keyValuePairs = location.search.slice(1).split('&');

	keyValuePairs.forEach(function(keyValuePair) {
		keyValuePair = keyValuePair.split('=');
		result[keyValuePair[0]] = keyValuePair[1] || '';
	});

	return result;
}
