const mapsApi = require('google-maps-api')('AIzaSyDKYaeLXuKtODPEm_6sQsdfYRpsaCovgyk');
const LocationMap = require('./create-map');

module.exports = class MapApi {
  constructor() {
    mapsApi().then(function() {
      new LocationMap();
    });
  }
}
