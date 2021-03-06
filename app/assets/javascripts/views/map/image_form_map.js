GeoFlickr.Views.ImageFormMap = GeoFlickr.Map.extend({
  attributes: {
    id: "form-map-canvas"
  },

  initialize: function () {
    this._geocoder = new google.maps.Geocoder();
  },

  initializeMap: function () {
    GeoFlickr.Map.prototype.initializeMap.call(this);

    var center = new google.maps.LatLng(37.7833, -122.4167);
    this._map.setCenter(center);
    this._map.setZoom(12);
  }
});
