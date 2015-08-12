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
    var mapShow = new GeoFlickr.Views.MapShow();
    // I'm not going to user addSubview because the map is only rendered once
    this.$("#map-container").html(mapShow.$el);
    mapShow.initializeMap();
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    // this.onRender();
    this.addMap();

    return this;
  }

});
