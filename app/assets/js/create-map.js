module.exports = class LocationMap {
  constructor() {
    this.locations = [
      {
        title: 'Profile Laser - Will Call, Sales, & Factory',
        address_href: 'https://www.google.com/maps?q=524+N+Tillamook+St+#104+Portland+OR+97227',
        address_line_1: '524 N Tillamook St, #104',
        address_line_2: 'Portland, OR 97227',
        hours: '8am - 4pm, M-F',
        phone: '971-271-7355',
        lat: 45.5375071,
        lng: -122.671425
      },
      {
        title: 'Profile Laser - Administrative Office',
        address_href: 'https://www.google.com/maps?q=Profile+Laser+LLC+Office+2138+N+Interstate+Ave+Portland+OR+97227',
        address_line_1: '2138 N Interstate Ave',
        address_line_2: 'Portland, OR 97227',
        hours: '8am - 4pm, M-F',
        phone: '503-292-6044',
        lat: 45.538433,
        lng: -122.67401999999998
      }
    ];

    this.mapOptions = {
      backgroundColor: '#ffffff',
      draggable: !(navigator.userAgent.indexOf(/mobile/gi) >= 0),
      disableDefaultUI: true,
      zoomControl: true,
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.SMALL
      },
      streetViewControl: true,
      scrollwheel: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.createMap();
  }

  createMap() {
    const bounds = new google.maps.LatLngBounds();
    this.map = new google.maps.Map(document.getElementById('map'), this.mapOptions);

    this.locations.forEach((location) => {
      location.position = new google.maps.LatLng(location.lat, location.lng);
      bounds.extend(location.position);
    });

    this.map.fitBounds(bounds);
    google.maps.event.addListenerOnce(this.map, 'idle', () => this.addMarkers());
  }

  addMarkers() {
    this.map.setZoom(17);

    const infoWindow = new google.maps.InfoWindow();
    const markerIcon = new google.maps.MarkerImage(
      'assets/marker.png',
      null,
      null,
      null,
      new google.maps.Size(80,45)
    );

    for (let location of this.locations) {
      let markerOption = {
        position: location.position,
        map: this.map,
        title: location.title,
        animation: google.maps.Animation.DROP,
        icon: markerIcon
      };
      let marker = new google.maps.Marker(markerOption);
      google.maps.event.addListener(marker, 'click', () => {
        infoWindow.setContent(this.populateMarker(location));
        infoWindow.open(this.map, marker);
      });
    }
  }

  populateMarker(location) {
    const markerMarkup = `
      <strong>${location.title}<br>
      <a href="${location.address_href}" target="_blank">
        ${location.address_line_1}<br>
        ${location.address_line_2}
      </a><br>
      ${location.hours}<br>
      ${location.phone}</strong>
    `
    return markerMarkup;
  }
}
