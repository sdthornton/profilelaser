const Masonry = require('masonry-layout');
const imagesLoaded = require('imagesloaded');

module.exports = class PopulateGallery {
  constructor() {
    this.galleryImages = document.querySelector('#gallery_images');
    this.markupTemplate = document.querySelector('.gallery-image-wrap').cloneNode(true);
    this.clearTemplateMarkup();
    this.populateGallery();
  }

  clearTemplateMarkup() {
    this.galleryImages.innerHTML = "";
  }

  populateGallery() {
    $.ajax({
      url: 'http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?',
      dataType: 'json',
      method: 'GET',
      timeout: 5000,
      data: {
        id: "90859317@N02",
        format: "json"
      }
    })
    .done((data) => this.onSuccess(data))
    .fail((data) => this.onError(data));
  }

  onSuccess(data) {
    const items = data.items;
    const tempWrap = document.createElement('div');

    for (let i = 0, len = items.length; i < len; i++) {
      let item = items[i];
      let link = item.link;
      let src = item.media.m.replace('_m', '_b');
      let markup = this.markupTemplate.cloneNode(true);
      markup.querySelector('a').href = link;
      markup.querySelector('img').src = src;
      tempWrap.appendChild(markup);
    }

    this.galleryImages.innerHTML = tempWrap.innerHTML;

    imagesLoaded(this.galleryImages, () => {
      new Masonry(this.galleryImages);
    });
  }

  onError(data) {
    alert('failed');
  }
}
