GeoFlickr.Views.PrimaryImage = Backbone.View.extend({
  template: JST["images/image_primary"],

  attributes: { "id": "primary-image-container" },

  // events: {
  //   "load #image-source": "render"
  // },

  initialize: function (options) {
    this.containerHeight = options.containerHeight;
    this.containerWidth = options.containerWidth;
    this.containerRatio = this.containerHeight / this.containerWidth;
    // this.listenTo(this.model, "sync", this.render);
    // this.$el.find("img").on("load", this.render.bind(this))
  },

  setDimensions: function () {
    var $img = this.$("img");

    if (!this.imageRatio) {
      var that = this;
      $("<img/>").attr("src", $img.attr("src")).load(function() {
          that.imageRatio = this.height / this.width;
          if (that.imageRatio > that.containerRatio) {
            $img.height(that.containerHeight)
          } else {
            $img.width(that.containerWidth)
          }
      });
    } else {
      if (this.imageRatio > this.containerRatio) {
        $img.height(this.containerHeight)
      } else {
        $img.width(this.containerWidth)
      }
    }
  },

  render: function () {
    // debugger
    var content = this.template({
      image: this.model
    })
    this.$el.html(content);
    this.setDimensions();

    return this;
  }
});
