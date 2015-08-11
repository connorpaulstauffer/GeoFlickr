GeoFlickr.Routers.Router = Backbone.Router.extend({
  routes: {
    "images/new": "newImage"
  },

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.$rootView = new GeoFlickr.Views.Root();
  },

  newImage: function () {
    var image = new GeoFlickr.Models.Image();
    var newImageView = new GeoFlickr.Views.ImageNew({ model: image });
  }
});
