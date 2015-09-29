module.exports = function() {
  var onHomePage = document.body.classList.contains('home-page');
  var onGalleryPage = document.body.classList.contains('gallery-page');
  var onContactPage = document.body.classList.contains('contact-page');

  if (onHomePage) {
    document.querySelector('.home-link').classList.add('current-page');
  } else if (onGalleryPage) {
    document.querySelector('.gallery-link').classList.add('current-page');
  } else if (onContactPage) {
    document.querySelector('.contact-link').classList.add('current-page');
  }
}
