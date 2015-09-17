module.exports = function() {
  var onHomePage = document.body.className.indexOf('home-page') >= 0;
  var onGalleryPage = document.body.className.indexOf('gallery-page') >= 0;
  var onContactPage = document.body.className.indexOf('contact-page') >= 0;

  if (onHomePage) {
  	$('.home-link').find('a').addClass('current-page');
  } else if (onGalleryPage) {
  	$('.gallery-link').find('a').addClass('current-page');
  } else if (onContactPage) {
  	$('.contact-link').find('a').addClass('current-page');
  }
}
