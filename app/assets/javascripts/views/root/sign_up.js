GeoFlickr.Views.SignUp = Backbone.View.extend({
  tagName: 'form',

  template: JST['root/sign_up'],

  addErrors: function (errors) {
    this.errors = errors;
    this.render();
  },

  render: function () {
    var content = this.template({ errors: this.errors });
    this.$el.html(content);

    return this;
  }
});
