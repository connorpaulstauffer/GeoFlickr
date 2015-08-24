GeoFlickr.Views.NoImagesAlert = Backbone.View.extend({
  template: JST["alerts/no_images"],

  attributes: { "id": "no-images-alert"},

  initialize: function (options) {
    this.isIndex = options.isIndex
  },

  render: function () {
    var content = this.template({
      isIndex: this.isIndex
    });
    this.$el.html(content);

    return this;
  }
})
