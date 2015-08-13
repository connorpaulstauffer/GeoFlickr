GeoFlickr.Views.ImageFormMap = Backbone.View.extend({
  attributes: {
    id: "form-map-canvas"
  },

  initialize: function () {
    this._geocoder = new google.maps.Geocoder();
  },

  initializeMap: function () {
    var mapOptions = {
      center: { lat: 37.7833, lng: -122.4167 },
      zoom: 12
    };

    this._map = new google.maps.Map(this.el, mapOptions);
    // var bounds = new google.maps.LatLngBounds();
    // this._map.fitBounds(bounds);
  }
});
