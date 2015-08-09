GeoFlickr.Views.SignUp = Backbone.CompositeView.extend({
  tagName: 'form',

  template: JST['root/sign_up'],

  addErrors: function (errors) {
    this.removeErrors();

    errors.forEach(function (error) {
      var errorView = new GeoFlickr.Views.Error({ error: error });
      this.addSubview('.errors', errorView);
    }.bind(this))
  },

  removeErrors: function () {
    this.eachSubview(function (subview, selector) {
      this.removeSubview(selector, subview);
    }.bind(this))
  },

  render: function () {
    var content = this.template({ errors: this.errors });
    this.$el.html(content);

    return this;
  }
});
