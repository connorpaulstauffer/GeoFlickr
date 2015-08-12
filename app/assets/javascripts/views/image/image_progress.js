GeoFlickr.Views.ImageProgress = Backbone.View.extend({
  template: JST['images/image_progress'],

  initialize: function (options) {
    this._data = options.data;
    this._file = options.data.files[0];
  },

  render: function () {
    var content = this.template({ file: this._file });
    this.$el.html(content);

    return this;
  }
});
