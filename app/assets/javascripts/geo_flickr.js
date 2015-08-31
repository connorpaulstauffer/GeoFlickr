window.GeoFlickr = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    router = new GeoFlickr.Routers.Router({ $rootEl: $('#root')})
    Backbone.history.start();
  }
};

$(GeoFlickr.initialize);
