GeoFlickr.Views.SliderItem = Backbone.View.extend({
  template: JST["images/image_slider_item"],

  render: function () {
    var content = this.template({
      image: this.model
    });
    this.$el.html(content);

    return this;
  }
});
