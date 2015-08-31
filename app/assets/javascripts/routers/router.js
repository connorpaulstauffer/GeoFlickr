GeoFlickr.Routers.Router = Backbone.Router.extend({
  routes: {
    "": "welcomeOrIndex",
    "images": "imageIndex",
    "images/?*querystring": "imageIndex",
    "images/new": "newImage",
    "images/:id": "imageShow",
    "users/:id": "userShow"
  },

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    if (this.$rootEl.data("current-user") == "") {
      currentUser = null;
    } else {
      currentUser = new GeoFlickr.Models.User({
        id: this.$rootEl.data("current-user")
      });
      currentUser.fetch();
    }
    this.$rootContent = this.$rootEl.find("#content");
    this.$navBar = this.$rootEl.find("#navbar");
    this.setupNavBar();
  },

  setupNavBar: function () {
    var navBar = new GeoFlickr.Views.NavBar({
      router: this
    });

    this.$navBar.html(navBar.$el);
    navBar.render();
  },

  welcomeOrIndex: function () {
    if (currentUser) {
      Backbone.history.navigate("images", { trigger: true })
    } else {
      this.welcome();
    }
  },

  welcome: function () {
    var welcomeView = new GeoFlickr.Views.Welcome();
    this.swap(welcomeView, true);
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

  imageIndex: function (queryString) {
    this._images = null;
    var params = this.parseQueryString(queryString);
    var data = {
      filter_data: params,
      page: 1
    }

    var imageIndex = new GeoFlickr.Views.ImageIndex({
      collection: this.images(),
      filter_data: params
    });
    this.swap(imageIndex);

    this.images().fetch({
      remove: false,
      data: data
    });
  },

  parseQueryString: function (queryString) {
    var params = {};
    if (!queryString) { return params; }
    var array = queryString.split("=");
    params[array[0]] = array[1];
    return params;
  },

  imageShow: function (id, collection) {
    var image = new GeoFlickr.Models.Image({ id: id })
    image.fetch();

    if (this.imageShowView) {
      this.imageShowView.setImage(image)
    } else {
      var imageShowView = new GeoFlickr.Views.ImageShow({
        model: image,
        collection: collection || this.images()
       });

      this.swap(imageShowView);
      this.imageShowView = imageShowView;
    }
  },

  userShow: function (id) {
    this._images = null;

    var user = new GeoFlickr.Models.User({ id: id });
    var userShow = new GeoFlickr.Views.UserShow({ model: user });
    user.fetch();

    this.swap(userShow);
  },

  beforeSwap: function (welcomeNav) {
    this.imageShowView = null;

    if (welcomeNav) {
      this.$navBar.addClass("welcome");
    } else {
      this.$navBar.removeClass("welcome");
    }
    $("#tag-dropdown").empty();
  },

  swap: function (newView, welcomeNav) {
    this.beforeSwap(welcomeNav);

    this.currentView && this.currentView.remove();
    this.currentView = newView;
    this.$rootContent.html(newView.$el);
    newView.render()

    return newView;
  }
});
