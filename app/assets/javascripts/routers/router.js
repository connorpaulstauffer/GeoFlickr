GeoFlickr.Routers.Router = Backbone.Router.extend({
  routes: {
    "": "imageIndex",
    "images/new": "newImage",
    "images/:id": "imageShow",
    "users/:id": "userShow"
  },

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.$rootContent = this.$rootEl.find("#content");
    this.$navBar = this.$rootEl.find("#navbar");
    this.images().fetch();
    this.setupNavBar();
  },

  setupNavBar: function () {
    var navBar = new GeoFlickr.Views.NavBar({
      currentUser: this.$rootEl.data("current-user")
    });

    this.$navBar.html(navBar.$el);
    navBar.render();
  },

  images: function () {
    if (!this._images) {
      this._images = new GeoFlickr.Collections.Images();
    }
    return this._images;
  },

  newImage: function () {
    var newImageView = new GeoFlickr.Views.ImageNew({
      collection: this.images()
    });
  },

  imageIndex: function () {
    var imageIndex = new GeoFlickr.Views.ImageIndex({
      collection: this.images()
    });
    this.swap(imageIndex);
  },

  imageShow: function (id) {
    var image = this.images().getOrFetch(id)
    var imageShow = new GeoFlickr.Views.ImageShow({ model: image });

    this.swap(imageShow);
  },

  userShow: function (id) {
    var user = new GeoFlickr.Models.User({ id: id });
    var userShow = new GeoFlickr.Views.UserShow({ model: user });
    user.fetch();

    this.swap(userShow);
  },

  swap: function (newView) {
    // temporary
    $("#tag-dropdown").empty();
    this._currentView && this.currentView.remove();
    this.currentView = newView;
    this.$rootContent.html(newView.$el);
    newView.render()

    return newView;
  }
});
