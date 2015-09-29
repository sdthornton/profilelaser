const Masonry = require('masonry-layout');
const imagesLoaded = require('imagesloaded');

module.exports = class PopulateGallery {
  constructor() {
    this.galleryImages = document.querySelector('#gallery_images');
    this.loader = document.querySelector('.loader');
    this.failure = document.querySelector('#gallery_fail');
    this.markupTemplate = document.querySelector('.gallery-image-wrap').cloneNode(true);
    this.clearTemplateMarkup();
    this.populateGallery();
  }

  clearTemplateMarkup() {
    this.galleryImages.innerHTML = "";
  }

  populateGallery() {
    const urlData = new Map();
    urlData.set('id', '90859317@N02');
    urlData.set('format', 'json');
    let srcUrl = 'http://api.flickr.com/services/feeds/photos_public.gne?';
    for (let [key, value] of urlData) {
      srcUrl = `${srcUrl}${key}=${value}&`;
    };
    this.dataSrc = document.createElement('script');
    this.dataSrc.async = true;
    this.dataSrc.src = srcUrl;
    window.jsonFlickrFeed = (data) => this.onSuccess(data);
    document.head.appendChild(this.dataSrc);
    this.failTimeout = setTimeout(() => this.onFail(), 5000);
  }

  onSuccess(data) {
    clearTimeout(this.failTimeout);
    this.always();

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

  always() {
    document.head.removeChild(this.dataSrc);
    this.loader.style.display = 'none';
  }

  onFail() {
    this.always();
    this.failure.style.display = 'block';
  }
}
