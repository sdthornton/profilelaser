require("babelify/polyfill");

const noPaintOnHover = require('./no-paint-on-hover');
noPaintOnHover();

const toggleCurrentPage = require('./toggle-current-page');
toggleCurrentPage();

window.Profile = {}
Profile.Talk = require('./talk');
Profile.PopulateGallery = require('./gallery-api');
Profile.GoogleMap = require('./map-api');

/* ==========================================================================
   Parallax and Other window.scroll events
   ========================================================================== */
// function bannerParallax() {
// 	"use strict";
// 	if ($(window).width() >= 768) {
// 		$(window).scroll(function() {
// 			var scroll = $(window).scrollTop();
// 			if (scroll > 500) {
// 				$('.banner').css({ visibility: 'hidden' });
// 				$('.scroll_banner').css({ visibility: 'hidden' });
// 			} else {
// 				$('.banner').css({ visibility: 'visible' });
// 				$('.scroll_banner').css({ visibility: 'visible' });
// 			}
// 			$('.banner_img_scroll').css('top', -scroll/8+80);
// 		});
// 	} else {
// 		document.getElementById('banner_img').style.top = "auto";
// 		$(window).scroll(function() {
// 			document.getElementById('banner_img').style.top = "auto";
// 		});
// 	}
// }
//
// if (home_page && !mobile) {
// 	bannerParallax();
// 	$(window).resize(function() {
// 		"use strict";
// 		bannerParallax();
// 	});
//
// 	if ($(window).width() >= 768) {
// 		$('.process_icon').css('opacity', '0');
// 		$('.why_icon').css('opacity', '0');
// 	}
//
// 	var windowHeight = $(window).height();
// 	var processIconOffset = $('.process_icon').offset().top;
// 	var whyIconOffset = $('.why_icon').offset().top;
// 	var iconHeight = $('.process_icon').height();
// 	var processIconBottomOffset = processIconOffset + iconHeight;
// 	var whyIconBottomOffset = whyIconOffset + iconHeight;
// 	var processIconShown = processIconBottomOffset - windowHeight;
// 	var whyIconShown = whyIconBottomOffset - windowHeight;
//
// 	$(window).scroll(function() {
// 		"use strict";
// 		var scroll = $(window).scrollTop();
// 		if (scroll > processIconShown) {
// 			$('.process_icon').animate({opacity: '1.0'}, 500);
// 		}
//
// 		if (scroll > whyIconShown) {
// 			$('.why_icon').animate({opacity: '1.0'}, 500);
// 		}
// 	});
// }


/* ==========================================================================
   AJAX for Contact Page Submission
   ========================================================================== */
// if (contact_page) {
// 	var form = $('#contact_form'),
// 		formElements = form.find('input[type!="submit"],textarea'),
// 		formSubmitButton = form.find('[type="submit"]'),
// 		errorNotice = $('#errors'),
// 		successNotice = $('#success'),
// 		loading = $('#loading'),
// 		errorMessages = {
// 			nospam: 'Sorry robot, no spamming for you today! If you are not a robot, but are in fact human, and you are seeing this error, it means you have accidentally filled out our hidden anti spam field. Simply leave that blank and try to resubmit the form.',
// 			required: ' is a required field',
// 			realname: 'Please enter your name',
// 			email: 'Please enter an email address',
// 			bademail: 'Please enter a valid email address',
// 			message: 'Please write us a message',
// 			location: 'Please enter your location (just the city and state)',
// 			minlength: ' must be greater than or equal to '
// 		};
//
// 	formSubmitButton.on('click', function() {
// 		"use strict";
//
// 		var formok = true,
// 			errors = [];
//
// 		formElements.each(function() {
// 			var name = this.name,
// 				nameUC = name.ucfirst(),
// 				value = this.value,
// 				type = this.getAttribute('type'),
// 				isRequired = this.getAttribute('required'),
// 				minLength = this.getAttribute('data-minlength');
//
// 			//if HTML5 formfields are supported
// 			if( (this.validity) && !this.validity.valid ){
// 				formok = false;
//
// 				console.log(this.validity);
//
// 				if(this.validity.valueMissing) {
// 					if (this.name === 'real_name') {
// 						errors.push(errorMessages.realname);
// 					} else if (this.name === 'email') {
// 						errors.push(errorMessages.email);
// 					} else if (this.name === 'message') {
// 						errors.push(errorMessages.message);
// 					} else if (this.name === 'location') {
// 						errors.push(errorMessages.location);
// 					} else {
// 						errors.push(nameUC + errorMessages.required);
// 					}
// 				} else if(this.validity.typeMismatch && type === 'email') {
// 					errors.push(errorMessages.bademail);
// 				}
//
// 				this.focus();
// 				return false;
// 			}
//
// 			//if this is a required element
// 			if(isRequired) {
// 				//if HTML5 input required attribute is not supported
// 				if (!Modernizr.input.required) {
// 					if(value === '') {
// 						this.focus();
// 						formok = false;
//
// 						if (this.name === 'real_name') {
// 							errors.push(errorMessages.realname);
// 						} else if (this.name === 'email') {
// 							errors.push(errorMessages.email);
// 						} else if (this.name === 'message') {
// 							errors.push(errorMessages.message);
// 						} else if (this.name === 'location') {
// 							errors.push(errorMessages.location);
// 						} else {
// 							errors.push(nameUC + errorMessages.required);
// 						}
//
// 						return false;
// 					}
// 				}
// 			}
//
// 			//if HTML5 input email input is not supported
// 			if(type === 'email') {
// 				if (!Modernizr.inputtypes.email) {
// 					var emailRegEx = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
// 					if (!emailRegEx.test(value)) {
// 						this.focus();
// 						formok = false;
// 						errors.push(errorMessages.bademail);
// 						return false;
// 					}
// 				}
// 			}
//
// 			//check minimum lengths
// 			if(minLength) {
// 				if (value.length < parseInt(minLength, 10)) {
// 					this.focus();
// 					formok = false;
// 					errors.push(nameUC + errorMessages.minlength + minLength + ' characters');
// 					return false;
// 				}
// 			}
//
// 			//Spam blocker
// 			if(name === 'name') {
// 				if (this.value !== '') {
// 					formok = false;
// 					errors.push(errorMessages.nospam);
// 					return false;
// 				}
// 			}
// 		});
//
// 		if(!formok) {
// 			//animate required field notice
// 			$('.req-field-desc')
// 				.stop()
// 				.animate({
// 					marginLeft: '+=' + 5
// 				},150,function(){
// 					$(this).animate({
// 						marginLeft: '-=' + 5
// 					},150);
// 				});
//
// 			//show error message
// 			showNotice('error',errors);
//
// 		} else {
// 			loading.show();
// 			formSubmitButton.attr('disabled', 'disabled');
// 			$.ajax({
// 				url: form.attr('action'),
// 				type: form.attr('method'),
// 				data: form.serialize(),
// 				success: function(){
// 					showNotice('success');
// 					form.get(0).reset();
// 					loading.hide();
// 					formSubmitButton.removeAttr('disabled');
// 				}
// 			});
// 		}
//
// 		return false; //this stops submission off the form and also stops browsers showing default error messages
//
// 	});
//
// 	var showNotice = function(type,data) {
// 		"use strict";
//
// 		if (type === 'error') {
// 			successNotice.hide();
// 			errorNotice.find("li[id!='info']").remove();
//
// 			var i;
// 			for (i=0; i < data.length; i++) {
// 				errorNotice.append('<li>'+data[i]+'</li>');
// 			}
// 			errorNotice.show();
// 		}
// 		else {
// 			errorNotice.hide();
// 			successNotice.show().delay(4000).slideUp('slow');
// 		}
// 	};
//
// 	String.prototype.ucfirst = function() {
// 		"use strict";
//
// 		return this.charAt(0).toUpperCase() + this.slice(1);
// 	};
// }
