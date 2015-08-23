GeoFlickr.Views.ImageProgress = Backbone.View.extend({
  template: JST['images/image_progress'],

  className: "panel panel-default progress-panel",

  events: {
    "click": "handleClick"
  },

  initialize: function (options) {
    this._data = options.data;
    this._file = options.data.files[0];
    this._event = options.event;
    this._selectable = false;
    // setTimeout(this.setBarWidth.bind(this), 100);
  },

  activate: function () {
    this.$el.removeClass("panel-default");
    this.$el.addClass("panel-success");
  },

  deactivate: function () {
    this.$el.removeClass("panel-success");
    this.$el.addClass("panel-default");
  },

  makeSelectable: function (newImageView, model) {
    this._selectable = true;
    this._newImageView = newImageView;
    this.model = model;
  },

  handleClick: function (event) {
    if (!this._selectable) { return; }
    this.select();
  },

  select: function () {
    this.activate();
    this._newImageView.displayForm(this.model);
  },

  render: function () {
    var content = this.template({ file: this._file });
    this.$el.html(content);

    return this;
  }
});
