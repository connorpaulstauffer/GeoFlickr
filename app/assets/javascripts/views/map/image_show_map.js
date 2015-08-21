GeoFlickr.Views.ImageShowMap = GeoFlickr.Map.extend({
  attributes: {
    id: "image-show-map-canvas"
  },

  initializeMap: function () {
    GeoFlickr.Map.prototype.initializeMap.call(this);
    this.setMarker();
    this.listenTo(this.model, "change", this.setMarker);
  },

  setMarker: function () {
    if (this._marker) { return; }
    var lat = this.model.get("latitude")
    var lng = this.model.get("longitude")
    if (lat && lng) {
      var marker = new google.maps.Marker({
        position: {
          lat: this.model.get("latitude"),
          lng: this.model.get("longitude")
        },
        map: this._map,
      });

      marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
      this._marker = marker;
      this._map.fitBounds(new google.maps.LatLngBounds(marker.position));
      this._map.setZoom(8);
    }

  }
});
