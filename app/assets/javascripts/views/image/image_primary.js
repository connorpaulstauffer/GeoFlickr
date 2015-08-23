GeoFlickr.Views.PrimaryImage = Backbone.View.extend({
  template: JST["images/image_primary"],

  attributes: { "id": "primary-image-container" },

  initialize: function (options) {
    this.imageCarousel = options.imageCarousel;
    this.containerHeight = options.containerHeight;
    this.containerWidth = options.containerWidth;
    this.containerRatio = this.containerHeight / this.containerWidth;
    this.listenTo(this.model, "change", this.render);
  },

  setDimensions: function () {
    var $img = this.$("img");
    if (!$img) { return; }

    if (!this.imageRatio) {
      var that = this;
      $("<img/>").attr("src", $img.attr("src")).load(function() {
          that.imageRatio = this.height / this.width;
          if (that.imageRatio > that.containerRatio) {
            $img.height(that.containerHeight)
          } else {
            $img.width(that.containerWidth)
          }
          that.imageCarousel.hideLoading();
      });
    } else {
      if (this.imageRatio > this.containerRatio) {
        $img.height(this.containerHeight)
      } else {
        $img.width(this.containerWidth)
      }
      this.imageCarousel.hideLoading();
    }
  },

  hide: function () {
    this.$el.css("visibility", "hidden");
  },

  show: function () {
    this.$el.css("visibility", "visible");
  },

  render: function () {
    var content = this.template({
      image: this.model
    })
    this.$el.html(content);
    this.setDimensions();

    return this;
  }
});
