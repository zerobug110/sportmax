jQuery(function($) {
  var methods = {
	//run once to identify all of the forms that need to be verified and link them to the single object
	init : function(options) {
	  var settings = $.extend( {
			addressContainerSelector:'#content-area',
			addressSelector:'form.address-form',
			triggerEvent:'click',
			successCallback:function(){}
	  		//,validationProgressCallback:function(arrayOfPromiseOjects) //will pass array of promise objects (one for each address)
		    }, options)
		  ,$addressContainer = $(settings.addressContainerSelector)
		  ,$addressesToVerify = $addressContainer.find(settings.addressSelector)
		  ,$trigger =$(this);
	  $addressesToVerify.each(function(){
		  var $curAddressToVerify=$(this);
		  $curAddressToVerify.data('addressVerificationTrigger', $trigger);
		  $curAddressToVerify.find('.hasBacking').change(function(){
			  $curAddressToVerify.removeData('verified').removeData('addressCustom');
		  });
	  });
	  $(this).data('addressFormsToVerify', $addressesToVerify);
	  $addressesToVerify.each(function(){
		  $(this).on('initAddress.addressVerify', methods.initAddress); 
	  });
	  $(this).on('initAddressComplete',settings.successCallback);

	  return $(this).on(settings.triggerEvent+'.addressVerify',
			  function(event){
		  		event.preventDefault();//avoids form submission 
		  		var initAddressesDeferred = $.Deferred();
		  		$(this).data('addressProcessing',initAddressesDeferred);
		  		if(typeof(settings.validationProgressCallback)== "function"){
		  			settings.validationProgressCallback.apply($addressContainer[0],[initAddressesDeferred.promise()]);
		  		}
		  		methods.processNextAddress.apply(this,event);
	  		  }); 
  	},
  	//externalized to allow integration(-1 means that the verification process was completed for all of the forms
  	verificationComplete : function(){
		var $this = $(this)
			,$triggerButton = (!$this.data('addressVerificationTrigger')?$this:$this.data('addressVerificationTrigger'))
			,$addressesToVerify = $triggerButton.data('addressFormsToVerify')
			,unverifiedIndex = -1;
		$addressesToVerify.each(function(index){
			  $currentAddress=$(this);
			  if (!$currentAddress.data('verified')){
				  unverifiedIndex = index;
				  return false;
			  }
		});
		return unverifiedIndex;
	},
	//finds first initialized(see init method)form that has not completed verification and triggers verification event 
	processNextAddress : function(event){
		var $this = $(this)
			,$triggerButton = (!$this.data('addressVerificationTrigger')?$this:$this.data('addressVerificationTrigger'))
			,$addressesToVerify = $triggerButton.data('addressFormsToVerify')
			,unverifiedAddressIndex = function($addressesToVerify){
			  var unverifiedIndex = -1;
			  $addressesToVerify.each(function(index){
				  $currentAddress=$(this);
				  if (!$currentAddress.data('verified')){
					  unverifiedIndex = index;
					  return false;
				  }
			  })
			  return unverifiedIndex;
			}
			,unverifiedAddIndex = unverifiedAddressIndex($addressesToVerify);
		if (unverifiedAddIndex>=0){
			  if (event!=null){
				 event.preventDefault();
			  }
			  $($addressesToVerify.get(unverifiedAddIndex)).trigger('initAddress.addressVerify');
		}else {
			  //all addresses have been verified successfully
			  $triggerButton.trigger('initAddressComplete');
			  $triggerButton.data('addressProcessing').resolve('finished');
		}
	},
  	//verify one of the initialized addresses; ($this) points to the address containing fields that needs verification 
  	initAddress : function(options) {
	  
		var $this = $(this)
			,getBackinFieldsFunc = function() {
				var addressArray = new Array();
				var i = 0;
				console.log("selected address:" + $("input[name='addressId']:checked").val());
				if( $("input[name='addressId']:checked").val()>0 ){
					address=$("input[name='addressId']:checked");
					addressArray[i++] = { name: 'addressId', value: $(address).attr('data-addressId') };
					addressArray[i++] = { name: 'nickName', value: $(address).attr('data-nickName') };
					addressArray[i++] = { name: 'firstName', value: $(address).attr('data-firstName') };
					addressArray[i++] = { name: 'lastName', value: $(address).attr('data-lastName') };
					addressArray[i++] = { name: 'address1', value: $(address).attr('data-address1') };
					addressArray[i++] = { name: 'address2', value: $(address).attr('data-address2') };
					addressArray[i++] = { name: 'city', value: $(address).attr('data-city') };
					addressArray[i++] = { name: 'state', value: $(address).attr('data-state') };
					addressArray[i++] = { name: 'zipCode', value: $(address).attr('data-zipCode') };
					addressArray[i++] = { name: 'country', value: $(address).attr('data-country') };
					addressArray[i++] = { name: 'phone1', value: $(address).attr('data-phone1') };
					addressArray[i++] = { name: 'email1', value: $(address).attr('data-email1') };
					
					console.log(addressArray);
					return addressArray;
				};				
				$this.find('.hasBacking').each(function() {
					addressArray[i] = { name: $(this).data('address'), value: $(this).val() };
		            i++;
				});
				console.log(addressArray);
				return addressArray;
			}
			,$triggerButton = (!$this.data('addressVerificationTrigger')?$this:$this.data('addressVerificationTrigger'));
		
		$.ajax({
			url: '/SearchAddress',
			dataType:'html',
			type:'POST',
		    beforeSend: function() {
				
	        },
	        data: getBackinFieldsFunc()
			}).fail(function() {
					//case when server does not respond
					$this.data('verified',true);
					$this.find('input[name="verificationResult"]').val('unverifiable');
					$this.removeData('addressCustom');
					methods.processNextAddress.call($this);
				}).done(function(data) {
					$result=$(data);
					//case of service error or wrong view: do not prevent user from checking out
					if (!$result.is('.proweb_popup')){
						$this.data('verified',true);
						$this.find('input[name="verificationResult"]').val('unverifiable');
						$this.removeData('addressCustom');
						methods.processNextAddress.call($this);
					//if returns verified no popup is displayed
					}else{
						var foundDifference=false;
						if ($result.is('.verified')){
							var suggestedValues = $result.find('.qas_details_right .hasBacking')
								,i=0;
							$result.find('.qas_details_left .hasBacking').each(function() {
								var $suggestedValue = $(suggestedValues.get(i));
								if ($(this).data('address')!=$suggestedValue.data('address')
										|| $(this).val()!=$suggestedValue.val()){
									foundDifference=true;
									return false;
								}
								i++;
							});
						}else{
							foundDifference=true;
						}
						if(!foundDifference){
							$result.addressVerify('initAVFormPopup',{$backingForm:$this});
							$result.find('.qas_btnbar_btn_right').click();	
						}else{
							$this.find('input[name="foundDifference"]').val('true');
							$this.data("isAbnormalTermination",true);
							var colorboxResizeFunction = function(){
								var $qasleft = $('.qas_details_left');
								var $qasright = $('.qas_details_right');
								if($qasleft.size()>0){
									if($qasright.size()>0){
										$.colorbox.resize({innerWidth:$('.qas_details_left').outerWidth(true)+$qasright.outerWidth(true)+38});
									}else{
										$.colorbox.resize({innerWidth:$('.qas_details_left').outerWidth(true)+22});
									}
								}else{
									$.colorbox.resize();
								}
							}
							$.colorbox({ 
								opacity: .3
								, scrolling: false
								, maxWidth: '100%'
								, href: data
								, inline: true
								, onComplete: function() {
									
									methods.initAVFormPopup.call($('#cboxLoadedContent'),
											{startLoadCallBack:function(){$('#cboxLoadedContent').hide();$('#cboxLoadingGraphic').show();}
											,endLoadCallBack:function(){
												$('#cboxLoadingGraphic').hide();
												var foundDifference=false;
												var $cboxContent=$('#cboxLoadedContent');
												if ($cboxContent.find('.proweb_popup.verified').length>0){
													var suggestedValues = $cboxContent.find('.qas_details_right .hasBacking')
														,i=0;
													$cboxContent.find('.qas_details_left .hasBacking').each(function() {
														var $suggestedValue = $(suggestedValues.get(i));
														if ($(this).data('address')!=$suggestedValue.data('address')
																|| $(this).val()!=$suggestedValue.val()){
															foundDifference=true;
															return false;
														}
														i++;
													});
												}else{
													foundDifference=true;
												}
												if(!foundDifference){
													$cboxContent.find('.qas_btnbar_btn_right').click();
												}else{
													$('#cboxLoadedContent').show();
												}
												//$.colorbox.resize({innerWidth:Math.max.apply(Math, $('#cboxLoadedContent').children().map(function(){ return $(this).outerWidth(true); }).get()),innerHeight:Math.max.apply(Math, $('#cboxLoadedContent').children().map(function(){ return $(this).outerHeight(true); }).get())});
												colorboxResizeFunction();
											}
											,completeCallBack:function(){$this.data("isAbnormalTermination",false);$.colorbox.close();},$backingForm:$this});
									colorboxResizeFunction();
								}
								, onClosed: function(){
									var overallStatus = $triggerButton.data('addressProcessing');
									if($this.data("isAbnormalTermination")){
										overallStatus.reject('userExit');
									}
									$this.removeData("isAbnormalTermination");
								}
							});	  	
						}
					}
				});
		
	},
	//initialize controls on the returned form ($thisinit - returned form)
	initAVFormPopup : function(options) {
		var $thisinit = this
			,settings = $.extend( {
			startLoadCallBack:function(){},
			endLoadCallBack:function(){},
			completeCallBack:function(){},
			$backingForm:$('#backingAddress')
		    }, options)
			,$verificationContainer = $thisinit.is('.proweb_popup')?$thisinit:$thisinit.find('.proweb_popup')
			,$avForm = $verificationContainer.find('form')
			,formFieldsFunc = function(){return $avForm.find('.asEntered.hasBacking').removeAttr('disabled').serializeArray();}
			,displayStatesForQAS = function(countrySelector) {
				var ajaxUrl = $avForm.find('#QasStateSelectorUrl').val();
				$.ajax({
				url: ajaxUrl,   
				data: { countryCode: countrySelector.val()},
				dataType: 'html',
				success: function(returnData) {
					$avForm.find('.qas_state_entry').replaceWith(returnData);
	            }
				});	
	    	}
			,formFields = $avForm.clone().find('input,select').removeAttr('disabled').serializeArray()
			//get entered address
			,formFieldsEnteredWithBackingFunc = function() {
				var addressArray = new Array()
					,i = 0;
				$avForm.find('.hasBacking.asEntered').each(function() {
					addressArray[i] = { name: $(this).data('address'), value: $(this).val() };
		            i++;
				});
				return addressArray;
			}
			//get suggested address
			,formFieldsSuggestedWithBackingFunc = function() {
				var addressArray = new Array()
					,i = 0;
				$avForm.find('.hasBacking.asSuggested').each(function() {
					addressArray[i] = { name: $(this).data('address'), value: $(this).val() };
		            i++;
				});
				return addressArray;
			}
			,setBackingCountryFunction = function(newAddress,$backingForm){
				if (typeof($.fn.displayStates) == 'function'){
					for (var index = 0; index < newAddress.length; index++){
						if (newAddress[index].name=="country"){
							var $backingCountry = $backingForm.find('[data-address="country"]');
							if($backingCountry.val()!=newAddress[index].value){
								return $countryUpdateState=$backingCountry.val(newAddress[index].value)
									.displayStates()
										.data('changestatus.displayStates');
							}
						}
					}
				}
			};		
		$verificationContainer.find('.qas_country_entry').on('change',function(e){
			displayStatesForQAS($verificationContainer.find('.qas_country_entry'));
		});
		
		
		//start editing of the original address
		$verificationContainer.find('.qas_btnrefine_edit').on('click',function(e){
				e.preventDefault();
				var $this = $(this);
				$this.closest('.qas_details_left').find('.qas_btnrefine_ok').show();
				$this.hide();
				$verificationContainer.find('.originaladdress input, .originaladdress select').removeAttr('disabled');
				$verificationContainer.find('.qas_details_right input[type=text]').val('').prop("disabled", true);
			});
			

		//accept original address
		$verificationContainer.find('.qas_btnbar_btn_left').on('click',function(e){
			e.preventDefault();
			var currentAddressFieldsWithBacking = formFieldsEnteredWithBackingFunc()
				,$countryUpdateState = setBackingCountryFunction(currentAddressFieldsWithBacking,settings.$backingForm)
				,proceedOnCountryChange = function (){
					for (index = 0; index < currentAddressFieldsWithBacking.length; ++index){
						settings.$backingForm.find('[data-address='+currentAddressFieldsWithBacking[index].name+']').val(currentAddressFieldsWithBacking[index].value);
					}
					settings.completeCallBack();
					settings.$backingForm.data('verified',true);
					settings.$backingForm.data('addressCustom',true);
					settings.$backingForm.find('input[name="verificationResult"]').val('customAddress');
					methods.processNextAddress.call(settings.$backingForm);
				};
			if ($countryUpdateState!='underfined' && $countryUpdateState!=null){
				//fail should never happen
				$countryUpdateState.done(proceedOnCountryChange).fail($.colorbox.close());
			}else{
				proceedOnCountryChange();
			}
		});
		//accept  suggested  address
		$verificationContainer.find('.qas_btnbar_btn_right').on('click',function(e){
			e.preventDefault();
			var currentAddressFieldsWithBacking = formFieldsSuggestedWithBackingFunc()
				,$countryUpdateState = setBackingCountryFunction(currentAddressFieldsWithBacking,settings.$backingForm)
				,proceedOnCountryChange = function (){
					for (var index = 0; index < currentAddressFieldsWithBacking.length; index++){
						console.log(settings.$backingForm.find('[data-address='+currentAddressFieldsWithBacking[index].name+']').val());
						settings.$backingForm.find('[data-address='+currentAddressFieldsWithBacking[index].name+']').val(currentAddressFieldsWithBacking[index].value);
					}
					settings.completeCallBack();
					settings.$backingForm.data('verified',true);
					settings.$backingForm.data('addressCustom',false);
					settings.$backingForm.find('input[name="verificationResult"]').val('suggestedAddress');
					methods.processNextAddress.call(settings.$backingForm);
				};
			if ($countryUpdateState!='underfined' && $countryUpdateState!=null){
				//fail should never happen
				$countryUpdateState.done(proceedOnCountryChange).fail($.colorbox.close());
			}else{
				proceedOnCountryChange();
			}
		});
		//initialize "Click to View Address Ranges" Link
		$verificationContainer.find('.qas_link').on('click',function(e){
			e.preventDefault();
			$thisinit.find('.addresslist').show();
		});
		
		//edit/refine original address 
		$avForm.submit(function(e){
			e.preventDefault();
			var form = $(this);
			$.ajax({
				url: form.prop("action"),
				dataType:'html',
				type:'POST',
			    beforeSend: function() {
					settings.startLoadCallBack();
		        },
		        data: formFieldsFunc()
				}).fail(function() {
						settings.endLoadCallBack();
						alert($verificationContainer.find('.ajaxPluginMessages .submitAjaxError').text());
					}).done(function(data) {
						var $result=$(data);
						//case where user submits invalid street or apartment or service error occurs
						if ($result.find('.addressVerifyAlert').length>0){
							$result.find('.addressVerifyAlert').each(function(){
								alert($(this).text());
							});
						}else if (!$result.is('.proweb_popup')){
							alert($verificationContainer.find('.ajaxPluginMessages .submitAjaxError').text());
						}else{
							$verificationContainer.replaceWith(data);
							methods.initAVFormPopup.call($thisinit,settings);
						}
						settings.endLoadCallBack();
					});
				    
		});
		
		//select one of the options in the suggested address list
		$verificationContainer.find('.partial_allresults a').on('click',function(e){
		    e.preventDefault();
			//override address validation action
			for (index = 0; index < formFields.length; ++index){
				if (formFields[index].name == "action") {
			    	 formFields[index].name = "actionOR";
			    	 break;
				}
			}
		    var $this=$(this);
			$.ajax({
				url: $this.prop('href'),
				dataType:'html',
				type:'POST',
			    beforeSend: function() {
					settings.startLoadCallBack();
		        },
		        data: formFields
				}).fail(function() {
						settings.endLoadCallBack();
						alert($verificationContainer.find('.ajaxPluginMessages .submitAjaxError').text()); 
					}).done(function(data) {
						var $result=$(data);
						//case where user submits invalid street or apartment or service error occurs
						if ($result.find('.addressVerifyAlert').length>0){
							$result.find('.addressVerifyAlert').each(function(){
								alert($(this).text());
							});
						}else if (!$result.is('.proweb_popup')){
							alert($verificationContainer.find('.ajaxPluginMessages .submitAjaxError').text());
						}else{
							$verificationContainer.replaceWith(data);
							methods.initAVFormPopup.call($thisinit,settings);
						}
						settings.endLoadCallBack();
					});
				    
			});
		}
	};
	
	$.fn.addressVerify=function(method){
		if ( methods[method] ) {
		      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		    } else if ( typeof method === 'object' || ! method ) {
		      return methods.init.apply( this, arguments );
		    } else {
		      $.error( 'Method ' +  method + ' does not exist on $.addressVerify' );
		    } 	
	}
	
}(jQuery));