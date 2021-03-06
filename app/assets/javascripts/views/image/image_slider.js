GeoFlickr.Views.ImageSlider = Backbone.CompositeView.extend({
  template: JST["images/image_slider"],

  events: {
    "afterChange #variable-width-slider": "handleSliderChange"
  },

  attributes: { "id": "slider-wrapper"},

  initialize: function (options) {
    this._carousel = options.carousel;
    this._primaryImage = options.activeImage
  },

  activateSlider: function () {
    this.$("#variable-width-slider").slick({
      centerMode: true,
      infinite: true,
      speed: 1,
      slidesToShow: 1,
      variableWidth: true,
      focusOnSelect: true
    });
  },

  addSliderItem: function (image) {
    var sliderItem = new GeoFlickr.Views.SliderItem({
      model: image
    });

    this.addSubview("#variable-width-slider", sliderItem);
    this.$("#variable-width-slider").slick("slickAdd", sliderItem.$el);

    if (image.id === parseInt(this._primaryImage.id)) {
      this.setPrimaryImage(image);
      var slickIdx = this.$("#variable-width-slider").slick("getSlick").slideCount - 1;
      this.$("#variable-width-slider").slick("goTo", slickIdx);
    }
  },

  handleSliderChange: function (event, slick, currentSlide, nextSlide) {
    if (this.currentSlide === currentSlide) { return; }

    this.currentSlide = currentSlide;
    var imageId = $(slick.$slides[currentSlide]).data("id");
    var image = this.collection.get(imageId);
    this.setPrimaryImage(image);

    Backbone.history.navigate("images/" + imageId, { trigger: true });
  },

  setPrimaryImage: function (image) {
    this._carousel.setPrimaryImage(image);
  },

  render: function () {
    var content = this.template({
      images: this.collection
    });
    this.$el.html(content);
    this.attachSubviews();

    return this;
  },

  onRender: function () {
    this.activateSlider();
    this.collection.each(this.addSliderItem.bind(this));
    this.listenTo(this.collection, "add", this.addSliderItem);
    var currentSlide = this.$("#variable-width-slider").slick("getSlick").currentSlide;
    this.$("#variable-width-slider").imagesLoaded(function () {
      this.$("#variable-width-slider").slick("slickGoTo", currentSlide)
    }.bind(this))
  }
});
