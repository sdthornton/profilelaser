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

//Checks page
var home_page = $('body').hasClass('home_page');
var gallery_page = $('body').hasClass('gallery_page');
var contact_page = $('body').hasClass('contact_page');

//Finds page params
function getParamByName(name, defaultParam) {
	"use strict";

	name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
	var regexS = "[\\?&]" + name + "=([^&#]*)";
	var regex = new RegExp(regexS);
	var results = regex.exec(window.location.search);
	if(results === null) {
		return defaultParam;
	} else {
		return decodeURIComponent(results[1].replace(/\+/g, " "));
	}
}


/* ==========================================================================
   Rotates through the quotes in the Talk section
   ========================================================================== */
var talkHeights = [];

$('.talk_box').each(function() {
	"use strict";

	talkHeights.push($(this).outerHeight());
});

var talkHeight = Math.max.apply(null, talkHeights);

$('.talk .container').height(talkHeight);

$('.talk_box').each(function() {
	"use strict";

	var thisHeight = $(this).height();
	var padding = (talkHeight - thisHeight)/2;
	$(this).css('padding', padding + 'px 0');
});

$('.talk_box').first().css('position', 'absolute').addClass('active_talk');
$('.talk_box').not('.active_talk').css({ display: 'none', visibility: 'visible' });

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

setInterval(nextTalk, 8000);


/* ==========================================================================
   Sets up prev and next buttons on Home Page banner
   ========================================================================== */
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


/* ==========================================================================
   Parallax and Other window.scroll events
   ========================================================================== */
$(window).scroll(function() {
	"use strict";

	var scroll = $(window).scrollTop();
	if (scroll < 0) { scroll = 0; }
	$('.banner').css('top', 80-scroll/8 + 'px');

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

var windowHeight = $(window).height();
if (windowHeight < 300) {
	$('footer').css('position', 'relative');
	$('.clients, .map').css('marginBottom', '0');
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

			$.each(data.items.slice(img_start, img_end), function(i,item){
				var img_src = (item.media.m).replace('_m.', '_b.');
				$('<a href="'+item.link+'" target="_blank" title="'+item.title+'"><img src="'+img_src+'" class="item" width="308" alt="'+item.title+'" /></a>').appendTo("#gallery_images");
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
		new Masonry(document.getElementById('gallery_images'), { columnWidth: 0 });
	});
}


/* ==========================================================================
   Google Maps
   ========================================================================== */
if (contact_page) {
	function googleMap() {
		"use strict";

		var profileLaser = new google.maps.LatLng(45.53856,-122.674016);
		var mapOptions = {
			backgroundColor: '#125a98',
			center: profileLaser,
			disableDefaultUI: true,
			zoom: 15,
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

		var marker = new google.maps.Marker({
			position: profileLaser,
			map: map,
			title: "Profile Laser",
			icon: markerIcon
		});

		var infowindow = new google.maps.InfoWindow({
			content:"<b>Profile Laser, LLC</b><br>2138 N. Interstate Ave<br>Portland, OR 97225"
		});

		google.maps.event.addListener(marker, 'click', function() {
			infowindow.open(map, marker);
		});
	}

	googleMap();
}