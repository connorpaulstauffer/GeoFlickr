GeoFlickr.Views.LogIn = Backbone.CompositeView.extend({
  tagName: 'form',

  template: JST['root/log_in'],

  initialize: function (options) {
    this._messages = options.parameters;
  },

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

  addMessages: function () {
    if (this._messages) {
      this.addErrors(this._messages);
      this._messages = null;
    }
  },

  render: function () {
    var content = this.template({ errors: this.errors });
    this.$el.html(content);
    this.addMessages();

    return this;
  }
});
