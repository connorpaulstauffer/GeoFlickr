GeoFlickr.Views.ImageIndex = Backbone.CompositeView.extend({
  template: JST['images/image_index'],

  className: "row",

  initialize: function () {
    this.addImageGrid();
  },

  addImageGrid: function () {
    var imageGrid = new GeoFlickr.Views.ImageGrid({
      collection: this.collection
    });
    this.addSubview('#photo-grid-container', imageGrid);
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();

    return this;
  }
});
