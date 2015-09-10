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

  addLoading: function () {
    this.loading = new GeoFlickr.Views.Loading();
    $(".modal-content").append(this.loading.$el);
  },

  showLoading: function () {
    this.loading.setDimensions($(".modal-content").height(), 0);
    this.loading.show();
    this.loading.appendSpinner();
  },

  hideLoading: function () {
    this.loading.hide();
  },

  render: function () {
    var content = this.template({ errors: this.errors });
    this.$el.html(content);
    this.addMessages();
    this.addLoading();

    return this;
  },

  remove: function () {
    this.loading.remove();
    Backbone.CompositeView.prototype.remove.call(this);
  }
});
