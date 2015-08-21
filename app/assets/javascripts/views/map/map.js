GeoFlickr.Map = Backbone.View.extend({
  initializeMap: function () {
    var styledMap = new google.maps.StyledMapType(
      this.style(),
      { name: "Styled Map" }
    );

    var mapOptions = {
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
    this._minZoom = 2;
    
    this.addMapListeners();
  },

  addMapListeners: function () {
    google.maps.event.addListener(this._map, "zoom_changed", function () {
      if (this._map.getZoom() < this._minZoom) {
        this._map.setZoom(this._minZoom)
      };
    }.bind(this));
  },

  style: function () {
    return [
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
  }
})
