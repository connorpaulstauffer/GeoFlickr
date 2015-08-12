GeoFlickr.Views.ImageForm = Backbone.View.extend({
  template: JST["images/image_form"],

  tagName: "form",

  initialize: function (options) {
    if (options.hidden) { this.$el.css("display", "none"); }
  },

  activate: function () {
    this.$el.removeAttr("style");
  },

  deactivate: function () {
    this.$el.css("display", "none");
  },

  render: function () {
    var content = this.template({ image: this.model });
    this.$el.html(content);

    return this;
  }
});
