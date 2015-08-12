GeoFlickr.Views.MapShow = Backbone.View.extend({
  attributes: {
    id: "map-canvas"
  },

  initialize: function () {
    this._markers = {};

    this.listenTo(this.collection, "add", this.addMarker);
    this.listenTo(this.collection, "remove", this.removeMarker);
  },

  initializeMap: function () {
    var mapOptions = {
      center: { lat: 37.7833, lng: -122.4167 },
      zoom: 12
    };
    this._map = new google.maps.Map(this.el, mapOptions);
    this.collection.each(this.addMarker.bind(this));
  },

  addMarker: function (image) {
    if (this._markers[image.id]) { return; }
    var view = this;

    var marker = new google.maps.Marker({
      position: {
        latitude: image.get("latitude"),
        longitude: image.get("longitude")
      },
      map: this.map,
      title: image.get("title")
    });

    google.maps.event.addListener(marker, 'click', function (event) {
      view.showMarkerInfo(event, marker);
    });

    this._markers[image.id] = marker;
  },

  removeMarker: function (image) {
    var marker = this._markers[image.id];
    marker.setMap(null);
    delete this._markers[image.id];
  },

  showMarkerInfo: function (event, marker) {
    var infoWindow = new google.maps.InfoWindow({
      content: marker.title
    });

    infoWindow.open(this._map, marker);
  }
});
