GeoFlickr.Views.ImageShow = Backbone.CompositeView.extend({
  template: JST["images/image_show"],

  className: "container-fluid image-show-container",

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    var content = this.template({ image: this.model })
    this.$el.html(content);
    // this.attachSubviews();

    return this;
  }
});
