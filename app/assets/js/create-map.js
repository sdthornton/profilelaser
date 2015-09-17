module.exports = class LocationMap {
  constructor() {
    this.locations = [
      {
        title: 'Profile Laser - Will Call, Sales, & Factory',
        lat: 45.5375071,
        lng: -122.671425
      },
      {
        title: 'Profile Laser - Administrative Office',
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

    for (let i = 0, len = this.locations.length; i < len; i++) {
      let location = this.locations[i];
      location.position = new google.maps.LatLng(location.lat, location.lng);
      bounds.extend(location.position);
    }

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

    for (let i = 0, len = this.locations.length; i < len; i++) {
      let location = this.locations[i];
      let markerOption = {
        position: location.position,
        map: this.map,
        title: location.title,
        animation: google.maps.Animation.DROP,
        icon: markerIcon
      };
      let marker = new google.maps.Marker(markerOption);
      google.maps.event.addListener(marker, 'click', () => {
        infoWindow.setContent(location.title);
        infoWindow.open(this.map, marker);
      });
    }
  }
}
