GeoFlickr.Routers.Router = Backbone.Router.extend({
  routes: {

  },

  initialize: function (options) {
    var $rootEl = options.$rootEl;
    var $rootView = new GeoFlickr.Views.Root();
    // var $rootEl.html($rootView.render().$el);
  }
});
