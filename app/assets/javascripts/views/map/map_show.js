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

    // this.listenTo(this.collection, "add", this.addMarker);
    this.listenTo(this.collection, "remove", this.removeMarker);
    this.listenTo(this.collection, "sync", this.handleSync);
    // the map currently doesn't move unless the collection changes
    // we want the
    this.listenTo(this.collection, "change:center", this.resetMap);
  },

  initializeMap: function () {
    var mapOptions = {
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.SMALL
      }
    };
    this._map = new google.maps.Map(this.el, mapOptions);
    this._bounds = new google.maps.LatLngBounds();
    this._minZoom = 2;
    this.collection.each(this.addMarker.bind(this));
    this.addMapListeners();
    this.addSearchInMapButton();
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
    // this._map.setCenter(this._center);
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

  searchByLocation: function (location) {
    this.collection.fetch({
      data: { filter_data: { location: location } },

      success: function (collection, response) {
      }.bind(this),

      error: function () {
        debugger;
      }
    })
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
    // use a loop to keep the map centered. call setCenter after fitBounds
    // this._map.setCenter(this._center);
    this._bounds.extend(marker.position);
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
      title: image.get("title") || "image"
    });

    marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
    google.maps.event.addListener(marker, 'click', function (event) {
      view.showMarkerInfo(event, marker);
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
