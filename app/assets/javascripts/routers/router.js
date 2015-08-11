GeoFlickr.Routers.Router = Backbone.Router.extend({
  routes: {
    "": "imageIndex",
    "images/new": "newImage"
  },

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.$rootView = new GeoFlickr.Views.Root();
    this.images().fetch();
  },

  images: function () {
    if (!this._images) {
      this._images = new GeoFlickr.Collections.Images();
    }
    return this._images;
  },

  newImage: function () {
    var image = new GeoFlickr.Models.Image();
    var newImageView = new GeoFlickr.Views.ImageNew({ model: image });
  },

  imageIndex: function () {
    var imageIndex = new GeoFlickr.Views.ImageIndex({
      collection: this.images()
    });
    this.swap(imageIndex);
  },

  swap: function (newView) {
    this._currentView && this.currentView.remove();
    this.currentView = newView;
    this.$rootEl.html(newView.$el);
    newView.render()

    return newView;
  }
});
