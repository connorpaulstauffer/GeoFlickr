GeoFlickr.Views.ImageCarousel = Backbone.CompositeView.extend({
  template: JST["images/image_carousel"],

  attributes: { "id": "image-carousel" },

  initialize: function (options) {
    this._activeImage = options.activeImage;
    this._images = options.images;
    this.addImageSlider();
    // this.setPrimaryImage(this._activeImage);
  },

  addImageSlider: function () {
    var imageSlider = new GeoFlickr.Views.ImageSlider({
      collection: this._images,
      carousel: this,
      activeImage: this._activeImage
    })

    this.addSubview("#slider-images", imageSlider);
  },

  setPrimaryImage: function (image) {
    if (this._primaryImageView) {
      this.removeSubview("#primary-image", this._primaryImageView)
      this._primaryImageView.remove();
    }

    this._primaryImageView = new GeoFlickr.Views.PrimaryImage({
      model: image
    });

    this.addSubview("#primary-image", this._primaryImageView);
    // Fixes height to a pixel value every time primary image renders
    this.$("#primary-image-container").height(this.$("#primary-image").height());
  },

  render: function () {
    var content = this.template()
    this.$el.html(content);
    this.attachSubviews();

    return this;
  },

  onRender: function () {
    var windowHeight = $( window ).height();
    var navbarHeight = $(".navbar").height();
    this.$el.height(windowHeight - navbarHeight - 200);
    this.$("#primary-image").height(windowHeight - navbarHeight - 300);
    Backbone.CompositeView.prototype.onRender.call(this);
  }
})
