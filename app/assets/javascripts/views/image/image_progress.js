GeoFlickr.Views.ImageProgress = Backbone.View.extend({
  template: JST['images/image_progress'],

  className: "panel panel-default progress-panel",

  initialize: function (options) {
    this._data = options.data;
    this._file = options.data.files[0];
    this._event = options.event;
    // setTimeout(this.setBarWidth.bind(this), 100);
  },

  // setBarWidth: function () {
  //   debugger;
  // },

  render: function () {
    var content = this.template({ file: this._file });
    this.$el.html(content);

    return this;
  }
});
