GeoFlickr.Views.ImageGridItem = Backbone.View.extend({
  className: "box panel panel-default",

  template: JST['images/image_grid_item'],

  events: {
    "mouseenter": "activate",
    "mouseleave": "deactivate",
    "mouseenter span": "activateGlyph",
    "mouseleave span": "deactivateGlyph"
  },

  initialize: function (options) {
    this._imageGrid = options.imageGrid
  },

  activate: function (event) {
    // this.$("span").addClass("active");
    this.$(".overlay").addClass("active");
    this._imageGrid.activateImage(this.model.id);
  },

  deactivate: function (event) {
    // this.$("span").removeClass("active");
    this.$(".overlay").removeClass("active");
    this._imageGrid.deactivateImage(this.model.id);
  },

  activateGlyph: function () {
    this.$(".glyphicon").removeClass("glyphicon-star-empty");
    this.$(".glyphicon").addClass("glyphicon-star");
  },

  deactivateGlyph: function () {
    this.$(".glyphicon").removeClass("glyphicon-star");
    this.$(".glyphicon").addClass("glyphicon-star-empty");
  },

  render: function () {
    var content = this.template({ image: this.model });
    this.$el.html(content);

    return this;
  }
});
