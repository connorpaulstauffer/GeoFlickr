GeoFlickr.Views.ImageCarousel = Backbone.CompositeView.extend({
  template: JST["images/image_carousel"],

  attributes: { "id": "image-carousel" },

  initialize: function (options) {
    this._activeImage = options.activeImage;
    this._images = options.images;
    this.addImageSlider();
    // this.addPrimaryImage();
  },

  addImageSlider: function () {
    var imageSlider = new GeoFlickr.Views.ImageSlider({
      collection: this._images
    })

    this.addSubview("#slider-images", imageSlider);
  },

  render: function () {
    var content = this.template()
    this.$el.html(content);
    this.attachSubviews();

    return this;
  }
})
