GeoFlickr.Views.LogIn = Backbone.View.extend({
  tagName: 'form',

  template: JST['root/log_in'],

  render: function () {
    var content = this.template();
    this.$el.html(content);

    return this;
  }
});
