GeoFlickr.Views.ImageShowMap = Backbone.View.extend({
  attributes: {
    id: "image-show-map-canvas"
  },

  initializeMap: function () {
    var styles = [
                    {
                        "featureType": "landscape.natural",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "visibility": "on"
                            },
                            {
                                "color": "#e0efef"
                            }
                        ]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "visibility": "on"
                            },
                            {
                                "hue": "#1900ff"
                            },
                            {
                                "color": "#c0e8e8"
                            }
                        ]
                    },
                    {
                        "featureType": "road",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "lightness": 100
                            },
                            {
                                "visibility": "simplified"
                            }
                        ]
                    },
                    {
                        "featureType": "road",
                        "elementType": "labels",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "transit.line",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "visibility": "on"
                            },
                            {
                                "lightness": 700
                            }
                        ]
                    },
                    {
                        "featureType": "water",
                        "elementType": "all",
                        "stylers": [
                            {
                                "color": "#7dcdcd"
                            }
                        ]
                    }
                ]
    var styledMap = new google.maps.StyledMapType(styles, { name: "Styled Map" });

    var mapOptions = {
      // center: { lat: 37.7833, lng: -122.4167 },
      // zoom: 12,
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.SMALL
      },
      mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
      }
    };

    this._map = new google.maps.Map(this.el, mapOptions);
    this._map.mapTypes.set("map_style", styledMap);
    this._map.setMapTypeId("map_style");
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
