GeoFlickr.Views.NoImagesAlert = Backbone.View.extend({
  template: JST["alerts/no_images"],

  attributes: { "id": "no-images-alert"},

  render: function () {
    var content = this.template();
    this.$el.html(content);

    return this;
  }
})
