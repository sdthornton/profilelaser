/* ==========================================================================
   Reusable functions
   ========================================================================== */
//Function to disable text selection
(function($){
	"use strict";

    $.fn.disableSelection = function() {
        return this
                 .attr('unselectable', 'on')
                 .css('user-select', 'none')
                 .on('selectstart', false);
    };
})(jQuery);

//Finds page params
function getParamByName(name, defaultParam) {
	"use strict";

	name = name;
	var regexS = "[\\?&]" + name + "=([^&#]*)";
	var regex = new RegExp(regexS);
	var results = regex.exec(window.location.search);
	if(results === null) {
		return defaultParam;
	} else {
		return decodeURIComponent(results[1].replace(/\+/g, " "));
	}
}

var retina = window.devicePixelRatio >= 1.5;

//Checks page and adds current_page class to nav links
var home_page = document.getElementsByTagName('body')[0].className === 'home_page';
var gallery_page = document.getElementsByTagName('body')[0].className === 'gallery_page';
var contact_page = document.getElementsByTagName('body')[0].className === 'contact_page';

if (home_page) {
	$('.home_link').addClass('current_page');
} else if (gallery_page) {
	$('.gallery_link').addClass('current_page');
} else if (contact_page) {
	$('.contact_link').addClass('current_page');
}

//Checks if mobile device
var mobile = /(alcatel|amoi|android|avantgo|blackberry|benq|cell|cricket|docomo|elaine|htc|iemobile|iphone|ipad|ipaq|ipod|j2me|java|midp|mini|mmp|mobi|motorola|nec-|nokia|palm|panasonic|philips|phone|playbook|sagem|sharp|sie-|silk|smartphone|sony|symbian|t-mobile|telus|up\.browser|up\.link|vodafone|wap|webos|wireless|xda|xoom|zte)/i.test(navigator.userAgent);

//Checks if Old IE
var oldie = $.browser.msie && $.browser.version < 9;


/* ==========================================================================
   Mobile and Small Screens
   ========================================================================== */
$('#fastclick').fastClick(function(e) {
	"use strict";
	e.preventDefault();
	e.stopPropagation();
	if (!mobile) {
		$('.mobile_nav').stop(true,true).slideToggle();
	} else {
		$('.mobile_nav').stop(true,true).toggle();
	}
});

function mobileBannerPosition() {
	"use strict";
	var windowWidth = $(window).width();
	var lefts = [0, windowWidth/2, windowWidth, windowWidth*1.5, windowWidth*2];
	var left = lefts[Math.floor(Math.random()*lefts.length)];
	if (windowWidth <= 640) {
		$('.banner_img').animate({ left: -left }, 0, function() {
			$('.banner_img').css({ visibility: 'visible' });
		});
	} else {
		$('.mobile_nav').css({ zIndex: '-2' });
		$('.mobile_nav').delay(300).animate({ visibility: 'hidden' }, 0);
		$('.mobile_nav ~ *').transition({ x:0 }, 300, 'ease');
		$('#fastclick').removeClass('open').css({ opacity: '0.75' });
	}
}

if (home_page) {
	mobileBannerPosition();
	$(window).resize(function() {
		"use strict";
		$('.banner_img').css({ left: '0', visibility: 'visible' });
	});
}


/* ==========================================================================
   Parallax and Other window.scroll events
   ========================================================================== */
function bannerParallax() {
	"use strict";
	if ($(window).width() >= 768) {
		$(window).scroll(function() {
			var scroll = $(window).scrollTop();
			if (scroll > 500) {
				$('.banner').css({ visibility: 'hidden' });
			} else {
				$('.banner').css({ visibility: 'visible' });
			}
			if (!oldie) { $('.banner_img').addClass('banner_img_scroll'); }
			$('.banner_img_scroll').css('top', -scroll/8);
		});
	} else {
		document.getElementById('banner_img').style.top = '0px';
		$(window).scroll(function() {
			document.getElementById('banner_img').style.top = '0px';
		});
	}
}

if (home_page && !mobile) {
	bannerParallax();
	$(window).resize(function() {
		"use strict";
		bannerParallax();
	});

	if ($(window).width() >= 768) {
		$('.process_icon').css('opacity', '0');
		$('.why_icon').css('opacity', '0');
	}

	var windowHeight = $(window).height();
	var processIconOffset = $('.process_icon').offset().top;
	var whyIconOffset = $('.why_icon').offset().top;
	var iconHeight = $('.process_icon').height();
	var processIconBottomOffset = processIconOffset + iconHeight;
	var whyIconBottomOffset = whyIconOffset + iconHeight;
	var processIconShown = processIconBottomOffset - windowHeight;
	var whyIconShown = whyIconBottomOffset - windowHeight;

	$(window).scroll(function() {
		"use strict";
		var scroll = $(window).scrollTop();
		if (scroll > processIconShown) {
			$('.process_icon').animate({opacity: '1.0'}, 500);
		}

		if (scroll > whyIconShown) {
			$('.why_icon').animate({opacity: '1.0'}, 500);
		}
	});
}


/* ==========================================================================
   Shows loading image until home page banner is loaded
   ========================================================================== */
if (home_page) {
	if ($(window).width() > 640) {
		$('#banner_img').load(function() {
			$(this).css('visibility', 'visible');
		});
	}
}


/* ==========================================================================
   Rotates through the quotes in the Talk section
   ========================================================================== */
function talkBoxHeight() {
	"use strict";
	var talkHeights = [];
	$('.talk_box').each(function() {
		talkHeights.push($(this).outerHeight());
	});
	var talkHeight = Math.max.apply(null, talkHeights);
	document.getElementById('talk_box_container').style.height = talkHeight+'px';
}

if (home_page) {
	talkBoxHeight();

	$(window).resize(function() {
		"use strict";
		talkBoxHeight();
	});

	$('.talk_box').first().css('position', 'absolute').addClass('active_talk');
	$('.talk_box').not('.active_talk').css({ display: 'none', visibility: 'visible' });
}

function nextTalk() {
	"use strict";
	var next = $('.active_talk').next();
	if ($('.talk_box').last().hasClass('active_talk')) {
		next = $('.talk_box').first();
	}

	$('.active_talk').removeClass('active_talk').animate({opacity: '0'}, 500).delay(500).fadeOut(0, function() {
		next.show().animate({ opacity: '1.0' }, 500).addClass('active_talk');
	});
}

var talkLength = $('.talk_box').length;
if (home_page && talkLength > 1) {
	setInterval(nextTalk, 15000);
}


/* ==========================================================================
   Fallback for background image on talk section
   ========================================================================== */
if (home_page && !Modernizr.backgroundsize) {
	$('.talk').css({ backgroundImage: 'none', borderTop: '#0F4C81', borderBottom: '#0F4C81'});
}


/* ==========================================================================
   Sets up prev and next buttons on Home Page banner
   ========================================================================== */
function nextImg() {
	"use strict";
	var windowWidth = $(window).width();
	var left = parseInt($('#banner_img').css('left'),10);
	var next = left - 400;
	var full = Math.abs(next) + windowWidth;
	var last = windowWidth - 2400;

	if (full > 2400) {
		if (left === last) {
			$('#banner_img').animate({
				left: '0'
			});
		} else {
			$('#banner_img').animate({
				left: last + 'px'
			});
		}
	} else {
		$('#banner_img').animate({
			left: next + 'px'
		});
	}	
}

function prevImg() {
	"use strict";
	var windowWidth = $(window).width();
	var left = parseInt($('#banner_img').css('left'),10);
	var prev = left + 400;
	var remainder = Math.abs(left % 400);
	var last = windowWidth - 2400;

	if (left < 0) {
		if (remainder === 0) {
			$('#banner_img').animate({
				left: prev + 'px'
			});
		} else {
			$('#banner_img').animate({
				left: (left + remainder) + 'px'
			});
		}
	} else {
		$('#banner_img').animate({
			left: last + 'px'
		});
	}
}

if (home_page && !mobile) {
	//Scrolls home page banner to the right
	$('.banner_next').on('click', function() {
		"use strict";
		$(this).disableSelection();
		nextImg();
	});

	//Scrolls home page banner to the left
	$('.banner_prev').on('click', function() {
		"use strict";
		$(this).disableSelection();
		prevImg();
	});
}


/* ==========================================================================
   Flickr API
   ========================================================================== */
if (gallery_page) {
	var per_page = getParamByName('per_page', '20');
	var page = getParamByName('page', '1');
	var img_start = (page-1)*per_page;
	var img_end = (per_page*page);

	$.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
		{
			id: "90859317@N02",
			format: "json"
		},
		function(data) {
			"use strict";

			$.each(data.items.slice(img_start, img_end), function(i,item) {
				var img_src = (retina) ? (item.media.m).replace('_m.', '_b.') : (item.media.m).replace('_m.', '.');

				$('<div class="box"><a href="'+item.link+'" target="_blank" title="'+item.title+'"><img src="'+img_src+'" class="item" width="308" alt="'+item.title+'" /></a></div>').appendTo("#gallery_images");
			});

			if (data.items.length > per_page) {
				var pages = Math.ceil(data.items.length / per_page);
				var index;
				var page_nums = [];

				for (index = 0; index < pages; ++index) {
					page_nums.push('<li><a href="?page='+(index+1)+'&per_page='+per_page+'">'+(index+1)+'</a></li>');
				}

				$('<ul />', {
					'class': 'pagination',
					html: page_nums.join('')
				}).insertAfter('#gallery_images');

				var last_page = ($('.pagination li').last().index())+1;

				$('.pagination li').eq(page-1).addClass('current_page').click(function(e) { e.preventDefault(); });
				$('.pagination li').eq(page-2).children('a').first().attr('rel', 'prev');
				$('.pagination li').eq(page).children('a').first().attr('rel', 'next');
				if (parseInt(page,10) !== 1) { $('.pagination li').first().before('<li><a href="?page='+(parseInt(page,10)-1)+'&per_page='+per_page+'" rel="prev">&larr;</a></li>'); }
				if (parseInt(page,10) !== last_page) { $('.pagination li').last().after('<li><a href="?page='+(parseInt(page,10)+1)+'&per_page='+per_page+'" rel="next">&rarr;</a></li>'); }
			}
		}
	);
		window.setTimeout(function() {
			"use strict";
			$('.loading_error').fadeIn('slow');
		}, 8000);

		$(window).load(function() {
			"use strict";
			$('.loading_error').remove();
			$('.loader').hide();
			$('#gallery_images').show();
			var gallery = new Masonry(document.getElementById('gallery_images'));
			return gallery;
		});

		$(window).resize(function() {
			"use strict";
			$('#gallery_images').show();
			var gallery = new Masonry(document.getElementById('gallery_images'));
			return gallery;
		});
}


/* ==========================================================================
   Google Maps
   ========================================================================== */
function googleMap() {
	"use strict";
	var profileLaser = new google.maps.LatLng(45.53856,-122.674016);
	var mapOptions;

	if (mobile) {
		mapOptions = {
			backgroundColor: '#125a98',
			center: profileLaser,
			draggable: false,
			disableDefaultUI: true,
			zoom: 17,
			zoomControl: true,
			zoomControlOptions: {
				style: google.maps.ZoomControlStyle.SMALL
			},
			streetViewControl: true,
			scrollwheel: false,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
	} else {
		mapOptions = {
			backgroundColor: '#f3f3f3',
			center: profileLaser,
			draggable: true,
			disableDefaultUI: true,
			zoom: 17,
			zoomControl: true,
			zoomControlOptions: {
				style: google.maps.ZoomControlStyle.SMALL
			},
			streetViewControl: true,
			scrollwheel: false,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
	}

	var mapStyle = [
		{
			featureType: 'all',
			elementType: 'all',
			stylers: [
				{ hues: '#125a98' },
				{ saturation: ''}
			]
		}
	];

	var map = new google.maps.Map(document.getElementById("map"), mapOptions);
	map.setOptions({styles: mapStyle});

	var markerIcon = new google.maps.MarkerImage(
		'img/marker.png',
		null,
		null,
		null,
		new google.maps.Size(80, 45)
	);

	window.setTimeout(function() {
		var marker = new google.maps.Marker({
			position: profileLaser,
			map: map,
			title: "Profile Laser",
			animation: google.maps.Animation.DROP,
			icon: markerIcon
		});

		var infowindow = new google.maps.InfoWindow({
			content:'<a href="http://maps.google.com/?q=Profile+Laser+LLC+2138+N+Interstate+Ave+Portland+OR+97227" target="_blank"><b>Profile Laser, LLC</b><br>2138 N. Interstate Ave<br>Portland, OR 97225"</a>'
		});

		google.maps.event.addListener(marker, 'click', function() {
			infowindow.open(map, marker);
		});
	}, 1500);
}

if (contact_page) {
	googleMap();
}


/* ==========================================================================
   AJAX for Contact Page Submission
   ========================================================================== */
if (contact_page) {
	var form = $('#contact_form'),
		formElements = form.find('input[type!="submit"],textarea'),
		formSubmitButton = form.find('[type="submit"]'),
		errorNotice = $('#errors'),
		successNotice = $('#success'),
		loading = $('#loading'),
		errorMessages = {
			nospam: 'Sorry robot, no spamming for you today! If you are not a robot, but are in fact human, and you are seeing this error, it means you have accidentally filled out our hidden anti spam field. Simply leave that blank and try to resubmit the form.',
			required: ' is a required field',
			realname: 'Please enter your name',
			email: 'Please enter an email address',
			bademail: 'Please enter a valid email address',
			message: 'Please write us a message',
			location: 'Please enter your location (just the city and state)',
			minlength: ' must be greater than '
		};

	formSubmitButton.on('click', function() {
		"use strict";

		var formok = true,
			errors = [];
			
		formElements.each(function() {
			var name = this.name,
				nameUC = name.ucfirst(),
				value = this.value,
				type = this.getAttribute('type'),
				isRequired = this.getAttribute('required'),
				minLength = this.getAttribute('data-minlength');
			
			//if HTML5 formfields are supported			
			if( (this.validity) && !this.validity.valid ){
				formok = false;
				
				console.log(this.validity);
				
				if(this.validity.valueMissing) {
					if (this.name === 'real_name') {
						errors.push(errorMessages.realname);
					} else if (this.name === 'email') {
						errors.push(errorMessages.email);
					} else if (this.name === 'message') {
						errors.push(errorMessages.message);
					} else if (this.name === 'location') {
						errors.push(errorMessages.location);
					} else {
						errors.push(nameUC + errorMessages.required);
					}
				} else if(this.validity.typeMismatch && type === 'email') {
					errors.push(errorMessages.bademail);
				}
				
				this.focus();
				return false;
			}
			
			//if this is a required element
			if(isRequired) {	
				//if HTML5 input required attribute is not supported
				if (!Modernizr.input.required) {
					if(value === '') {
						this.focus();
						formok = false;

						if (this.name === 'real_name') {
							errors.push(errorMessages.realname);
						} else if (this.name === 'email') {
							errors.push(errorMessages.email);
						} else if (this.name === 'message') {
							errors.push(errorMessages.message);
						} else if (this.name === 'location') {
							errors.push(errorMessages.location);
						} else {
							errors.push(nameUC + errorMessages.required);
						}

						return false;
					}
				}
			}

			//if HTML5 input email input is not supported
			if(type === 'email') {
				if (!Modernizr.inputtypes.email) {
					var emailRegEx = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; 
					if (!emailRegEx.test(value)) {
						this.focus();
						formok = false;
						errors.push(errorMessages.bademail);
						return false;
					}
				}
			}
			
			//check minimum lengths
			if(minLength) {
				if (value.length < parseInt(minLength, 10)) {
					this.focus();
					formok = false;
					errors.push(nameUC + errorMessages.minlength + minLength + ' characters');
					return false;
				}
			}

			//Spam blocker
			if(name === 'name') {
				if (this.value !== '') {
					formok = false;
					errors.push(errorMessages.nospam);
					return false;
				}
			}
		});
		
		if(!formok) {
			//animate required field notice
			$('.req-field-desc')
				.stop()
				.animate({
					marginLeft: '+=' + 5
				},150,function(){
					$(this).animate({
						marginLeft: '-=' + 5
					},150);
				});
			
			//show error message 
			showNotice('error',errors);

		} else {
			loading.show();
			formSubmitButton.attr('disabled', 'disabled');
			$.ajax({
				url: form.attr('action'),
				type: form.attr('method'),
				data: form.serialize(),
				success: function(){
					showNotice('success');
					form.get(0).reset();
					loading.hide();
					formSubmitButton.removeAttr('disabled');
				}
			});
		}
		
		return false; //this stops submission off the form and also stops browsers showing default error messages
		
	});

	var showNotice = function(type,data) {
		"use strict";

		if (type === 'error') {
			successNotice.hide();
			errorNotice.find("li[id!='info']").remove();

			var i;
			for (i=0; i < data.length; i++) {
				errorNotice.append('<li>'+data[i]+'</li>');
			}
			errorNotice.show();
		}
		else {
			errorNotice.hide();
			successNotice.show().delay(4000).slideUp('slow');
		}
	};

	String.prototype.ucfirst = function() {
		"use strict";

		return this.charAt(0).toUpperCase() + this.slice(1);
	};
}


/* ==========================================================================
   Footer Positioning
   ========================================================================== */
var footer = document.getElementsByTagName('footer')[0];

function footerPosition() {
	"use strict";
	var footerHeight = $('footer').outerHeight();
	$('.bottom_section').css({ marginBottom: footerHeight +'px' });
	var windowHeight = $(window).height();
	var headerHeight = $('header').height();
	var bodyHeight = $('body').outerHeight();

	if (footerHeight > (windowHeight - headerHeight) || (footerHeight + bodyHeight) < windowHeight) {
		footer.style.position = 'relative';
		$('.bottom_section').css('marginBottom', '0');
	} else {
		footer.style.position = 'fixed';
		$('.bottom_section').css('marginBottom', footerHeight);
	}
}

if (!mobile) {
	$(window).load(function() {
		"use strict"; footerPosition();
	});

	$(window).resize(function() {
		"use strict"; footerPosition();
	});
} else {
	$('.bottom_section').css({ marginBottom: '0' });
	$('footer').css({ position: 'relative', zIndex: '1' });
}


/* ==========================================================================
   Extra Mobile JS
   ========================================================================== */
if (!mobile) {
	$('.tel_link').on('click', function(e) {
		"use strict";

		e.preventDefault();
	}).css('cursor', 'default');
}

if (mobile) {
	$('.scroll_banner').remove();
}