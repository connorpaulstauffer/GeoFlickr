GeoFlickr.Views.SliderItem = Backbone.View.extend({
  template: JST["images/image_slider_item"],

  className: "slider-item",

  attributes: function () {
    return {
      "data-id": this.model.id
    }
  },

  render: function () {
    var content = this.template({
      image: this.model
    });
    this.$el.html(content);

    return this;
  }
});
