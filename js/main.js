//Scrolls home page banner to the right
$('.banner_next').on('click', function() {
	var windowWidth = $(window).width();
	var left = parseInt($('.banner_img').css('left'));
	var next = left - 400;
	var full = Math.abs(next) + windowWidth;
	var last = windowWidth - 2400;

	if (full > 2400) {
		if (left == last) {
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
	var windowWidth = $(window).width();
	var left = parseInt($('.banner_img').css('left'));
	var prev = left + 400;
	var remainder = Math.abs(left % 400);
	var last = windowWidth - 2400;

	if (left < 0) {
		if (remainder == 0) {
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
