GeoFlickr.Views.ImageIndex = Backbone.CompositeView.extend({
  template: JST['images/image_index'],

  className: "row",

  initialize: function () {
    this.addImageGrid();
    // this.listenTo(this.collection, "add", )
  },

  addImageGrid: function () {
    var imageGrid = new GeoFlickr.Views.ImageGrid({
      collection: this.collection
    });
    this.addSubview('#photo-grid-container', imageGrid);
  },

  addMap: function () {
    if (this._map) { return; }
    var mapShow = new GeoFlickr.Views.MapShow({
      collection: this.collection
    });
    // I'm not going to use addSubview because the map is only rendered once
    this.$("#map-container").html(mapShow.$el);
    this.setMapContainerHeight();
    mapShow.initializeMap();
  },

  setMapContainerHeight: function () {
    var windowHeight = $( window ).height();
    var navbarHeight = $(".navbar").height();
    var searchHeight = $("#search-controls").height();
    this.$("#map-and-search-container").height(windowHeight - navbarHeight - 2);
    this.$("#map-container").height(windowHeight - searchHeight - navbarHeight + 2);
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    this.addMap();

    return this;
  }

});
