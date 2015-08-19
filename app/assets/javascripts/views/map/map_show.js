GeoFlickr.Views.MapShow = Backbone.View.extend({
  attributes: {
    id: "map-canvas"
  },

  searchInMapTemplate: JST["search/search_in_map"],

  events: {
    "click #search-in-map": "search"
  },

  initialize: function () {
    this._markers = {};
    this.listenTo(this.collection, "remove", this.removeMarker);
    this.listenTo(this.collection, "sync", this.handleSync);
    this.listenTo(this.collection, "change:center", this.resetMap);
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

    var coordinates = $.parseJSON(this.collection.center);
    this._center = new google.maps.LatLng(coordinates[0], coordinates[1]);
    this._bounds = new google.maps.LatLngBounds(this._center);

    if (this.collection.length == 0) {
      this.extendForEmptyCollection();
    } else {
      this.collection.each(this.addMarker.bind(this));
    }

    this._minZoom = 2;
    this.addMapListeners();
    this.addSearchInMapButton();
  },

  extendForEmptyCollection: function () {
      var northeast = new google.maps.LatLng(
        this._center.G + 5,
        this._center.K - 5
      )
      this._bounds.extend(northeast);

      var southwest = new google.maps.LatLng(
        this._center.G - 5,
        this._center.K + 5
      )
      this._bounds.extend(southwest);

      this._map.fitBounds(this._bounds);
  },

  handleSync: function () {
    if (this.collection.center) {
      this.resetMap();
    } else {
      this.resetMarkers();
    }
  },

  resetMarkers: function () {
    _(this._markers).each(this.removeMarker.bind(this));
    this.collection.each(function (image) {
      this.addMarker(image, false);
    }.bind(this));
  },

  resetMap: function () {
    if (!this.collection.center) { return; }
    _(this._markers).each(this.removeMarker.bind(this));
    var coordinates = $.parseJSON(this.collection.center);
    this._center = new google.maps.LatLng(coordinates[0], coordinates[1]);
    this._bounds = new google.maps.LatLngBounds(this._center);

    this.collection.each(function (image) {
      this.addMarker(image, true);
    }.bind(this));
  },

  addSearchInMapButton: function () {
    var button = this.searchInMapTemplate();
    this.$el.append(button);
  },

  addMapListeners: function () {
    google.maps.event.addListener(this._map, "zoom_changed", function () {
      if (this._map.getZoom() < this._minZoom) {
        this._map.setZoom(this._minZoom)
      };
    }.bind(this));
  },

  search: function () {
    this.collection.center = null;
    var mapBounds = this._map.getBounds();
    var ne = mapBounds.getNorthEast();
    var sw = mapBounds.getSouthWest();

    var bounds = {
      lat: [sw.lat(), ne.lat()],
      lng: [sw.lng(), ne.lng()]
    };

    this.collection.fetch({ data: {
      filter_data: {
        bounds: bounds
      }
    } });
  },

  filterByTags: function (checked) {
    this.collection.center = null;
    var mapBounds = this._map.getBounds();
    var ne = mapBounds.getNorthEast();
    var sw = mapBounds.getSouthWest();

    var filterData = {
      bounds: {
        lat: [sw.lat(), ne.lat()],
        lng: [sw.lng(), ne.lng()]
      },
      tags: checked
    };

    this.collection.fetch({
      data: {
        filter_data: filterData
      }
    })
  },

  extendBounds: function (marker) {
    this._bounds.extend(marker.position);
    // extend equally in opposite direction to maintain center
    var lat_diff = marker.position.G - this._center.G
    var lng_diff = marker.position.K - this._center.K

    var inverse_lat = this._center.G - lat_diff
    var inverse_lng = this._center.K - lng_diff

    var inverse_position = new google.maps.LatLng(inverse_lat, inverse_lng);
    this._bounds.extend(inverse_position);

    this._map.fitBounds(this._bounds);
  },

  // confineBounds: function () {
  //   // it would be nice to avoid doing this for every removed marker
  //   this._bounds = new google.maps.LatLngBounds();
  //   _(this._markers).forEach(function (marker) {
  //     this._bounds.extend(marker.position);
  //     this._map.fitBounds(this._bounds);
  //   }.bind(this));
  // },

  addMarker: function (image, extendBounds) {
    if (this._markers[image.id]) { return; }
    if (!(image.get("latitude") && image.get("longitude"))) { return; }
    var view = this;

    var marker = new google.maps.Marker({
      position: {
        lat: image.get("latitude"),
        lng: image.get("longitude")
      },
      map: this._map,
      title: image.get("address"),
      image: '<img src="' + image.get("image").image.micro.url + '" class="marker-image">'
    });

    marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');

    google.maps.event.addListener(marker, 'mouseover', function (event) {
      view.showMarkerInfo(event, marker);
    });

    google.maps.event.addListener(marker, 'mouseout', function (event) {
      view.hideMarkerInfo(event, marker);
    });

    if (extendBounds) {
      this.extendBounds(marker);
    }
    this._markers[image.id] = marker;
  },

  removeMarker: function (image) {
    var marker = this._markers[image.id];
    if (marker) {
      marker.setMap(null);
      delete this._markers[image.id];
    }
    // this.confineBounds();
  },

  showMarkerInfo: function (event, marker) {
    var infoWindow = new google.maps.InfoWindow({
      content: marker.image
    });

    infoWindow.open(this._map, marker);
    marker.infoWindow = infoWindow;

    google.maps.event.addListener(infoWindow, 'domready', function() {
      var iwOuter = $('.gm-style-iw');
      var iwBackground = iwOuter.prev();
      iwBackground.children(':nth-child(2)').css({'display' : 'none'});
      iwBackground.children(':nth-child(4)').css({'display' : 'none'});
      iwBackground.children(':nth-child(3)').find('div').children().css({'box-shadow': 'rgba(72, 181, 233, 0.6) 0px 1px 6px', 'z-index' : '1'});
    });
  },

  hideMarkerInfo: function (event, marker) {
    marker.infoWindow.close();
  },

  activateMarker: function (id) {
    var marker = this._markers[id]
    marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png')
    marker.setAnimation(google.maps.Animation.BOUNCE);
  },

  deactivateMarker: function (id) {
    var marker = this._markers[id]
    marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png')
    marker.setAnimation(null);
  }
});
