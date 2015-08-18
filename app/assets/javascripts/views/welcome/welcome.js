GeoFlickr.Views.Welcome = Backbone.View.extend({
  template: JST["welcome/welcome"],

  render: function () {
    var content = this.template();
    this.$el.html(content);

    return this;
  }
});
