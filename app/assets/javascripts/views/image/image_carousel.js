GeoFlickr.Views.ImageCarousel = Backbone.CompositeView.extend({
  template: JST["images/image_carousel"],

  attributes: { "id": "image-carousel" },

  events: {
    "mouseenter #slider-images": "expandSlider",
    "mouseleave #slider-images": "shrinkSlider",
    "click #left-arrow": "prevSlide",
    "click #right-arrow": "nextSlide"
  },

  initialize: function (options) {
    this._activeImage = options.activeImage;
    this._images = options.images;

    if (this._images.length > 0) {
      this.addImageSlider();
    }
  },

  expandSlider: function () {
    this.$("#slider-images").addClass("large");
    this.$(".slider-item").each(function (idx, slider) {
      var width = $(slider).find("img").width()
      $(slider).css("width", width);
    });
  },

  shrinkSlider: function () {
    this.$("#slider-images").removeClass("large");
    var slickIdx = this.$("#variable-width-slider").slick("slickCurrentSlide");
    this.$("#variable-width-slider").slick("goTo", slickIdx);

    this.$(".slider-item").each(function (idx, slider) {
      var width = $(slider).find("img").width()
      $(slider).css("width", width);
    });
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

    var containerHeight = this.$("#primary-image").height();
    var containerWidth = this.$("#primary-image").width() - 100;

    this._primaryImageView = new GeoFlickr.Views.PrimaryImage({
      model: image,
      containerHeight: containerHeight,
      containerWidth: containerWidth
    });

    this.addSubview("#primary-image", this._primaryImageView);
    this.$("#primary-image-container").height(containerHeight);
    this.$("#primary-image-container").width(containerWidth);
  },

  setOnlyImage: function (image) {
    var containerHeight = this.$("#primary-image").height();
    var containerWidth = this.$("#primary-image").width();

    this._primaryImageView = new GeoFlickr.Views.PrimaryImage({
      model: image,
      containerHeight: containerHeight,
      containerWidth: containerWidth
    });

    this.addSubview("#primary-image", this._primaryImageView);
    this.$("#primary-image-container").height(containerHeight);
    this.$("#primary-image-container").width(containerWidth);
    this.$("#primary-image > a").css("display", "none")
  },

  nextSlide: function () {
    $("#variable-width-slider").slick("slickNext");
  },

  prevSlide: function () {
    $("#variable-width-slider").slick("slickPrev");
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
    this.$el.height(windowHeight - navbarHeight - 100);

    if (this._images.length < 2) {
      this.$("#primary-image").height(windowHeight - navbarHeight - 100);
      this.setOnlyImage(this._activeImage)
    } else {
      this.$("#primary-image").height(windowHeight - navbarHeight - 135);
    }

    Backbone.CompositeView.prototype.onRender.call(this);
  }
})
