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
    // var mapOptions = {
    // };
    this._map = new google.maps.Map(this.el);
    this._bounds = new google.maps.LatLngBounds();
    this.collection.each(this.addMarker.bind(this));
  },

  extendBounds: function (marker) {
    this._bounds.extend(marker.position);
    this._map.fitBounds(this._bounds);
  },

  confineBounds: function () {
    // it would be nice to avoid doing this for every removed marker
    this._bounds = new google.maps.LatLngBounds();
    _(this._markers).forEach(function (marker) {
      this._bounds.extend(marker.position);
      this._map.fitBounds(this._bounds);
    }.bind(this));
  },

  addMarker: function (image) {
    if (this._markers[image.id]) { return; }
    if (!(image.get("latitude") && image.get("longitude"))) { return; }
    var view = this;

    var marker = new google.maps.Marker({
      position: {
        lat: image.get("latitude"),
        lng: image.get("longitude")
      },
      map: this._map,
      title: image.get("title") || "image"
    });

    marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
    google.maps.event.addListener(marker, 'click', function (event) {
      view.showMarkerInfo(event, marker);
    });

    this.extendBounds(marker);
    this._markers[image.id] = marker;
  },

  removeMarker: function (image) {
    var marker = this._markers[image.id];
    if (marker) {
      marker.setMap(null);
      delete this._markers[image.id];
    }
    this.confineBounds();
  },

  showMarkerInfo: function (event, marker) {
    var infoWindow = new google.maps.InfoWindow({
      content: marker.title
    });

    infoWindow.open(this._map, marker);
  },

  activateMarker: function (id) {
    this._markers[id].setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png')
    // this._markers[id].setAnimation(google.maps.Animation.BOUNCE);
  },

  deactivateMarker: function (id) {
    this._markers[id].setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png')
    // this._markers[id].setAnimation(null);
  }
});
