GeoFlickr.Views.ImageShow = Backbone.CompositeView.extend({
  template: JST["images/image_show"],

  className: "container-fluid",

  render: function () {
    var content = this.template({ image: this.model })
    this.$el.html(content);
    // this.attachSubviews();

    return this;
  }
});
