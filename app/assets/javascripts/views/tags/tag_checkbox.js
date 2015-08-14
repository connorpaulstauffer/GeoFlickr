GeoFlickr.Views.TagCheckbox = Backbone.View.extend({
  template: JST["tags/tag_checkbox"],

  className: "tag-checkbox",

  initialize: function (options) {
    this._image = options.image;
    this.listenTo(this._image.tags(), "add", this.checkForActive);
  },

  checkForActive: function () {
    if (this._image.tags().get(this.model)) {
      this.$("input").attr("checked", "checked");
    }
  },

  render: function () {
    var content = this.template({
      tag: this.model
    });
    this.$el.html(content);
    this.checkForActive();

    return this;
  }
});
