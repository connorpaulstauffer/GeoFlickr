GeoFlickr.Views.ImageForm = Backbone.View.extend({
  template: JST["images/image_form"],

  events: {
    "keypress #search-input": "handleSearchKeypress"
  },

  initialize: function (options) {
    if (options.hidden) { this.$el.css("display", "none"); }
  },

  addMap: function () {
    if (this._map) { return; }
    this.imageFormMap = new GeoFlickr.Views.ImageFormMap({
      $searchBar: this.$("#search-input")
    });
    this.$("#image-form-map").html(this.imageFormMap.$el);
    this.imageFormMap.initializeMap();
  },

  handleSearchKeypress: function (event) {
    if (event.which === 13) {
      this.searchOnMap($(event.currentTarget).val());
    }
  },

  searchOnMap: function (input) {
    event.preventDefault();
    var that = this;
    this.imageFormMap._geocoder.geocode( { 'address': input}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        that.imageFormMap._map.setCenter(results[0].geometry.location);
        that._marker = new google.maps.Marker({
            map: that.imageFormMap._map,
            position: results[0].geometry.location
        });
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  },

  activate: function () {
    this.$el.removeAttr("style");
  },

  deactivate: function () {
    this.$el.css("display", "none");
  },

  render: function () {
    var content = this.template({ image: this.model });
    this.$el.html(content);

    return this;
  },

  onRender: function () {
    this.addMap();
  }
});
