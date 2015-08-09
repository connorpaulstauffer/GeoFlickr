GeoFlickr.Views.SignUp = Backbone.View.extend({
  tagName: 'form',

  template: JST['root/sign_up'],

  render: function () {
  var content = this.template();
  this.$el.html(content);

  return this;
}
});
