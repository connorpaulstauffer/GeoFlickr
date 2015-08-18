GeoFlickr.Views.Welcome = Backbone.View.extend({
  template: JST["welcome/welcome"],

  className: "welcome-container",

  setHeight: function () {
    this.$el.height($( window ).height())
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.setHeight();

    return this;
  }
});
