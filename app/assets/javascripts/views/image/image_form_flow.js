GeoFlickr.Views.ImageFormFlow = Backbone.CompositeView.extend({
  template: JST["images/image_form_flow"],

  initialize: function (options) {
    this._images = options.newImages,
    this._modal = options.modal
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);

    return this;
  }
})
