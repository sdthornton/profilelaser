require('babelify/polyfill');
require('vendor/classList');

const noPaintOnHover = require('./no-paint-on-hover');
noPaintOnHover();

const toggleCurrentPage = require('./toggle-current-page');
toggleCurrentPage();

const easterEgg = require('./easter-egg');
easterEgg();

window.Profile = {}
Profile.Talk = require('./talk');
Profile.PopulateGallery = require('./gallery-api');
Profile.GoogleMap = require('./map-api');
Profile.Contact = require('./contact');
