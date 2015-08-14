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
    this.listenTo(this.model, "change", this.setupFavoriteGlyph);
  },

  activate: function (event) {
    this.$(".overlay").addClass("active");
    this._imageGrid.activateImage(this.model.id);
  },

  deactivate: function (event) {
    this.$(".overlay").removeClass("active");
    this._imageGrid.deactivateImage(this.model.id);
  },

  setupFavoriteGlyph: function () {
    if (this.model.isFavorited()) {
      this.$(".glyphicon").addClass("favorited");
    } else {
      this.$(".glyphicon").removeClass("favorited");
    }
    this.deactivateGlyph();
  },

  activateGlyph: function () {
    var $thisGlyph = this.$(".glyphicon");
    if ($thisGlyph.hasClass("favorited")) {
      $thisGlyph.removeClass("glyphicon-star");
      $thisGlyph.addClass("glyphicon-star-empty");
    } else {
      $thisGlyph.removeClass("glyphicon-star-empty");
      $thisGlyph.addClass("glyphicon-star");
    }
  },

  deactivateGlyph: function () {
    var $thisGlyph = this.$(".glyphicon");
    if ($thisGlyph.hasClass("favorited")) {
      $thisGlyph.removeClass("glyphicon-star-empty");
      $thisGlyph.addClass("glyphicon-star");
    } else {
      $thisGlyph.removeClass("glyphicon-star");
      $thisGlyph.addClass("glyphicon-star-empty");
    }
  },

  render: function () {
    var content = this.template({ image: this.model });
    this.$el.html(content);
    this.setupFavoriteGlyph();

    return this;
  }
});
