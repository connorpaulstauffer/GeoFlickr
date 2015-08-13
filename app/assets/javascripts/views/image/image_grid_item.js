GeoFlickr.Views.ImageGridItem = Backbone.View.extend({
  className: "box panel panel-default",

  template: JST['images/image_grid_item'],

  events: {
    "mouseenter": "activate",
    "mouseleave": "deactivate"
  },

  initialize: function (options) {
    this._imageGrid = options.imageGrid
  },

  activate: function (event) {
    this._imageGrid.activateImage(this.model.id);
  },

  deactivate: function (event) {
    this._imageGrid.deactivateImage(this.model.id);
  },

  render: function () {
    var content = this.template({ image: this.model });
    this.$el.html(content);

    return this;
  }
});
