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
   Rotates through the quotes in the Talk section
   ========================================================================== */
var talkHeights = [];

$('.talk_box').each(function() {
	"use strict";

	talkHeights.push($(this).outerHeight());
});

var talkHeight = Math.max.apply(null, talkHeights);

if (home_page) {
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

if (home_page) {
	setInterval(nextTalk, 8000);
}


/* ==========================================================================
   Sets up prev and next buttons on Home Page banner
   ========================================================================== */
if (home_page) {
	//Scrolls home page banner to the right
	$('.banner_next').on('click', function() {
		"use strict";

		$(this).disableSelection();

		var windowWidth = $(window).width();
		var left = parseInt($('.banner_img').css('left'),10);
		var next = left - 400;
		var full = Math.abs(next) + windowWidth;
		var last = windowWidth - 2400;

		if (full > 2400) {
			if (left === last) {
				$('.banner_img').animate({
					left: '0'
				});
			} else {
				$('.banner_img').animate({
					left: last + 'px'
				});
			}
		} else {
			$('.banner_img').animate({
				left: next + 'px'
			});
		}
	});

	//Scrolls home page banner to the left
	$('.banner_prev').on('click', function() {
		"use strict";

		$(this).disableSelection();

		var windowWidth = $(window).width();
		var left = parseInt($('.banner_img').css('left'),10);
		var prev = left + 400;
		var remainder = Math.abs(left % 400);
		var last = windowWidth - 2400;

		if (left < 0) {
			if (remainder === 0) {
				$('.banner_img').animate({
					left: prev + 'px'
				});
			} else {
				$('.banner_img').animate({
					left: (left + remainder) + 'px'
				});
			}
		} else {
			$('.banner_img').animate({
				left: last + 'px'
			});
		}
	});
}


/* ==========================================================================
   Parallax and Other window.scroll events
   ========================================================================== */
$(window).scroll(function() {
	"use strict";

	var scroll = $(window).scrollTop();
	if (scroll < 0) { scroll = 0; }
	$('.banner img').css('top', -scroll/8 + 'px');

	/*if (scroll >= 420 && !$('header').hasClass('small_header')) {
		$('header').animate({height: '60px'}, 200).addClass('small_header');
		$('header nav li').animate({lineHeight: '60px'}, 200);
		$('header img').animate({height: '40px', width: '193.6px', margin: '10px 0'}, 200);
	} else if (scroll < 420 && $('header').hasClass('small_header')) {
		$('header').animate({height: '80px'}, 200).removeClass('small_header');
		$('header nav li').animate({lineHeight: '80px'}, 200);
		$('header img').animate({height: '50px', width: '242px', margin: '15px 0'}, 200);
	}*/
});


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

			$.each(data.items.slice(img_start, img_end), function(i,item){
				var img_src = (item.media.m).replace('_m.', '_b.');
				$('<a href="'+item.link+'" target="_blank" title="'+item.title+'"><img src="'+img_src+'" class="item" width="472" alt="'+item.title+'" /></a>').appendTo("#gallery_images");
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
	).complete( window.onload = function() {
		"use strict";

		new Masonry(document.getElementById('gallery_images'), { columnWidth: 0 });
	});
}


/* ==========================================================================
   Google Maps
   ========================================================================== */
function googleMap() {
	"use strict";

	var profileLaser = new google.maps.LatLng(45.53856,-122.674016);
	var mapOptions = {
		backgroundColor: '#125a98',
		center: profileLaser,
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

	
	var setMarker = setTimeout(function() {
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
var locationField = document.getElementById('location').value === '';
if (contact_page && navigator.geolocation && locationField) {
	window.onload = function() {
		navigator.geolocation.getCurrentPosition(function(position) {
			"use strict";

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
	}
}


/* ==========================================================================
   AJAX for Contact Page Submission
   ========================================================================== */
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
		minlength: ' must be greater than '
	}

formSubmitButton.on('click', function() {
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
				if (this.name == 'real_name') {
					errors.push(errorMessages.realname);
				} else if (this.name == 'email') {
					errors.push(errorMessages.email);
				} else if (this.name == 'message') {
					errors.push(errorMessages.message);
				} else if (this.name == 'location') {
					errors.push(errorMessages.location);
				} else {
					errors.push(nameUC + errorMessages.required);
				}
			} else if(this.validity.typeMismatch && type == 'email') {
				errors.push(errorMessages.bademail);
			}
			
			this.focus();
			return false;
		}
		
		//if this is a required element
		if(isRequired) {	
			//if HTML5 input required attribute is not supported
			if(!Modernizr.input.required) {
				if(value == '') {
					this.focus();
					formok = false;

					if (this.name == 'real_name') {
						errors.push(errorMessages.realname);
					} else if (this.name == 'email') {
						errors.push(errorMessages.email);
					} else if (this.name == 'message') {
						errors.push(errorMessages.message);
					} else if (this.name == 'location') {
						errors.push(errorMessages.location);
					} else {
						errors.push(nameUC + errorMessages.required);
					}

					return false;
				}
			}
		}

		//if HTML5 input email input is not supported
		if(type == 'email') { 	
			if(!Modernizr.inputtypes.email) { 
				var emailRegEx = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; 
			 	if( !emailRegEx.test(value) ){	
					this.focus();
					formok = false;
					errors.push(errorMessages.bademail);
					return false;
				}
			}
		}
		
		//check minimum lengths
		if(minLength) {
			if (value.length < parseInt(minLength) ) {
				this.focus();
				formok = false;
				errors.push(nameUC + errorMessages.minlength + minLength + ' characters');
				return false;
			}
		}

		//Spam blocker
		if(name == 'name') {
			if (this.value != '') {
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

//other misc functions
function showNotice(type,data)
{
	if(type == 'error'){
		successNotice.hide();
		errorNotice.find("li[id!='info']").remove();
		for(x in data){
			errorNotice.append('<li>'+data[x]+'</li>');	
		}
		errorNotice.show();
	}
	else {
		errorNotice.hide();
		successNotice.show();	
	}
}

String.prototype.ucfirst = function() {
	return this.charAt(0).toUpperCase() + this.slice(1);
}


/* ==========================================================================
   Mobile JS
   ========================================================================== */
if (!mobile) {
	$('.tel_link').on('click', function(e) {
		e.preventDefault();
	}).css('cursor', 'default');
}