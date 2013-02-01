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

function getElementsByClassName(classname) {
	var a = [];
    var re = new RegExp('(^| )'+classname+'( |$)');
    var els = document.body.getElementsByTagName("*");
    for(var i=0,j=els.length; i<j; i++)
        if(re.test(els[i].className))a.push(els[i]);
    return a;
}

var retina = window.devicePixelRatio >= 1.5;

//Checks page and adds current_page class to nav links
var home_page = document.getElementsByTagName('body')[0].className === 'home_page';
var gallery_page = document.getElementsByTagName('body')[0].className === 'gallery_page';
var contact_page = document.getElementsByTagName('body')[0].className === 'contact_page';

if (home_page) {
	document.getElementById('home_link').className += 'current_page';
} else if (gallery_page) {
	document.getElementById('gallery_link').className += 'current_page';
} else if (contact_page) {
	document.getElementById('contact_link').className += 'current_page';
}

//Checks if mobile device
var mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile/i.test(navigator.userAgent);


/* ==========================================================================
   Sets up prev and next buttons on Home Page banner
   ========================================================================== */
if (home_page) {
	//Scrolls home page banner to the right
	$('.banner_next').on('click', function() {
		"use strict";

		$(this).disableSelection();

		var windowWidth = $(window).width();
		var left = parseInt($('#banner_img').css('left'),10);
		var next = left - 400;
		var full = Math.abs(next) + windowWidth;
		var last = windowWidth - 3200;

		if (full > 3200) {
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
	});

	//Scrolls home page banner to the left
	$('.banner_prev').on('click', function() {
		"use strict";

		$(this).disableSelection();

		var windowWidth = $(window).width();
		var left = parseInt($('#banner_img').css('left'),10);
		var prev = left + 400;
		var remainder = Math.abs(left % 400);
		var last = windowWidth - 3200;

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
	});
}


/* ==========================================================================
   Parallax and Other window.scroll events
   ========================================================================== */
if (home_page && !mobile) {
	$('.banner').addClass('in_front');
	$('.process_icon').css('opacity', '0');
	$('.why_icon').css('opacity', '0');

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

		if (scroll < 0) { 
			scroll = 0;
		} else if (scroll >= 500 && $('.banner').hasClass('in_front')) {
			scroll = 500;
			getElementsByClassName('banner')[0].style.zIndex = '-3';
			$('.banner').addClass('in_back').removeClass('in_front');
		} else if (scroll < 500 && $('.banner').hasClass('in_back')) {
			getElementsByClassName('banner')[0].style.zIndex = '-1'; $('.banner').addClass('in_front').removeClass('in_back');
		}

		document.getElementById('banner_img').style.top = (-scroll/8) + 'px';

		if(scroll > processIconShown) {
			$('.process_icon').animate({opacity: '1.0'}, 500);
		}

		if(scroll > whyIconShown) {
			$('.why_icon').animate({opacity: '1.0'}, 500);
		}
	});
}


/* ==========================================================================
   Rotates through the quotes in the Talk section
   ========================================================================== */
if (home_page) {
	var talkHeights = [];

	$('.talk_box').each(function() {
		"use strict";

		talkHeights.push($(this).outerHeight());
	});

	var talkHeight = Math.max.apply(null, talkHeights);

	window.onload = function() { "use strict"; document.getElementById('talk_box_container').style.height = talkHeight+'px'; };

	$('.talk_box').each(function() {
		"use strict";

		var thisHeight = $(this).height();
		var padding = (talkHeight - thisHeight)/2;
		this.style.padding = padding+'px 0';
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
	setInterval(nextTalk, 10000);
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
				if(retina) {
					var img_src = (item.media.m).replace('_m.', '_b.');
				} else {
					var img_src = (item.media.m).replace('_m.', '.');
				}
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
				if (parseInt(page,10) !== 1) { $('.pagination li').first().before('<li><a href="?page='+(parseInt(page,10)-1)+'&per_page='+per_page+'">&larr;</a></li>'); }
				if (parseInt(page,10) !== last_page) { $('.pagination li').last().after('<li><a href="?page='+(parseInt(page,10)+1)+'&per_page='+per_page+'">&rarr;</a></li>'); }
			}
		}
	);
		window.setTimeout(function() {
			$('.loading_error').fadeIn('slow');
		}, 5000);

		$(window).load(function() {
			$('.loading_error').remove();
			$('.loader').hide();
			$('#gallery_images').show().masonry({
				itemSelector: '.box'
			});
		});
}


/* ==========================================================================
   Google Maps
   ========================================================================== */
function googleMap() {
	"use strict";

	var profileLaser = new google.maps.LatLng(45.53856,-122.674016);

	if (mobile) {
		var mapOptions = {
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
		var mapOptions = {
			backgroundColor: '#125a98',
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
			content:"<b>Profile Laser, LLC</b><br>2138 N. Interstate Ave<br>Portland, OR 97225"
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
   Automatically Fill in Location on Contact Page
   ========================================================================== */
if (contact_page) {
	var locationField = document.getElementById('location').value === '';
	if (navigator.geolocation && locationField) {
		window.onload = function() {
			"use strict";

			navigator.geolocation.getCurrentPosition(function(position) {
				var latitude = position.coords.latitude;
				var longitude = position.coords.longitude;
				var locationAPI = "http://maps.googleapis.com/maps/api/geocode/json?latlng="+latitude+","+longitude+"&sensor=false";

				$.getJSON(locationAPI,
					function(data) {
						var city = data.results[2].address_components[1].long_name;
						var state = data.results[2].address_components[2].short_name;

						document.getElementById('location').value = city+', '+state;
					}
				);
			});
		};
	}
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
			$.ajax({
				url: form.attr('action'),
				type: form.attr('method'),
				data: form.serialize(),
				success: function(){
					showNotice('success');
					form.get(0).reset();
					loading.hide();
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
var bottomSection = document.getElementsByClassName('bottom_section')[0];

function footerPosition() {
	"use strict";

	var footerHeight = $('footer').outerHeight();
	bottomSection.style.marginBottom = footerHeight+'px';
	var windowHeight = $(window).height();
	var pageHeight = $('html').outerHeight();
	
	if ((pageHeight - footerHeight) < windowHeight) {
		footer.style.bottom = 'auto';
		footer.style.position = 'relative';
		footer.style.zIndex = '0';
		$('footer').addClass('relative_footer');

		bottomSection.style.marginBottom = '0';
	} else if ($('footer').hasClass('relative_footer')) {
		footer.style.bottom = '0';
		footer.style.position = 'fixed';
		footer.style.zIndex = '-2';
		$('footer').removeClass('relative_footer');

		bottomSection.style.marginBottom = footerHeight+'px';
	}
}

if (!mobile) {
	$(window).load(function() {
		"use strict"; footerPosition();
	});

	$(window).resize(function() {
		"use strict"; footerPosition();
	});
}


/* ==========================================================================
   Mobile JS
   ========================================================================== */
if (!mobile) {
	$('.tel_link').on('click', function(e) {
		"use strict";

		e.preventDefault();
	}).css('cursor', 'default');
}

if (mobile) {
	getElementsByClassName('banner')[0].style.position = 'absolute';
	
	footer.style.bottom = 'auto';
	footer.style.position = 'relative';
	footer.style.zIndex = '0';
	bottomSection.style.marginBottom = '0';
}