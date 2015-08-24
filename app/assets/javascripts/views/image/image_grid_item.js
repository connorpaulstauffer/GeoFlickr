GeoFlickr.Views.ImageGridItem = Backbone.View.extend({
  className: "box panel panel-default",

  template: JST['images/image_grid_item'],

  events: {
    "mouseenter": "activate",
    "mouseleave": "deactivate",
    "mouseenter span": "activateGlyph",
    "mouseleave span": "deactivateGlyph",
    "click span": "toggleFavorite"
  },

  initialize: function (options) {
    this._imageGrid = options.imageGrid
    this.listenTo(this.model.favorite(), "change", this.setupFavoriteGlyph);
    this.listenTo(this.model, "change", this.attachImage);
  },

  activate: function (event) {
    this.$(".overlay").addClass("active");
    this._imageGrid.activateImage(this.model.id);
  },

  attachImage: function () {
    if (this.model.get("image")) {
      var url = this.model.get("image").image.thumb.url;
      var img = $("<img>");
      img.attr("src", url);
      this.$("#grid-image").html(img);
    }
  },

  deactivate: function (event) {
    this.$(".overlay").removeClass("active");
    this._imageGrid.deactivateImage(this.model.id);
  },

  toggleFavorite: function (event) {
    event.preventDefault();
    this.model.isFavorited() ? this.unfavoriteImage() : this.favoriteImage();
  },

  favoriteImage: function () {
    this.model.favorite().save({ image_id: this.model.id }, {
      error: function (model, response) {
        $("#log-in").trigger("click", [response.responseJSON]);
      }
    });
    this.model.set({ favorites_count: this.model.get("favorites_count") + 1 });
  },

  unfavoriteImage: function () {
    this.model.favorite().destroy();
    this.model.favorite().clear();
    this.model.set({ favorites_count: this.model.get("favorites_count") - 1 });
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
    this.attachImage();

    return this;
  }
});
