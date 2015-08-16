GeoFlickr.Views.ImageSlider = Backbone.CompositeView.extend({
  template: JST["images/image_slider"],

  activateSlider: function () {
    this.$("#variable-width-slider").slick({
      dots: true,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      centerMode: true,
      variableWidth: true
    });
  },

  addSliderItem: function (image) {
    var sliderItem = new GeoFlickr.Views.SliderItem({
      model: image
    });

    this.addSubview("#variable-width-slider", sliderItem);
    // sliderItem.$el.slick("slickAdd", this.$("#variable-width-slider"))
    this.$("#variable-width-slider").slick("slickAdd", sliderItem.$el);
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
  }
});
