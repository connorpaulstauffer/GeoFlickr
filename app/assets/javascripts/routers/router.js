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
      // global
      currentUser = null;
    } else {
      // global
      currentUser = new GeoFlickr.Models.User({
        id: this.$rootEl.data("current-user")
      });
      currentUser.fetch();
    }
    this.$rootContent = this.$rootEl.find("#content");
    this.$navBar = this.$rootEl.find("#navbar");
    // this.images().fetch();
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

  imageIndex: function (querystring) {
    if (!querystring) {
      this.images().fetch({
        data: { filter_data: { location: location } },

        success: function (collection, response) {
          var imageIndex = new GeoFlickr.Views.ImageIndex({
            collection: collection
          });

          this.swap(imageIndex);
        }.bind(this),

        error: function () {
          debugger;
        }.bind(this)
      })
    } else {
      var location = querystring.split("=")[1];
      this.images().fetch({
        data: { filter_data: { location: location } },

        success: function (collection, response) {
          var imageIndex = new GeoFlickr.Views.ImageIndex({
            collection: collection
          });

          this.swap(imageIndex);
        }.bind(this),

        error: function () {
          debugger;
        }.bind(this)
      })
    }
  },

  imageShow: function (id) {
    var image = new GeoFlickr.Models.Image({ id: id })
    image.fetch();

    if (this.imageShowView) {
      this.imageShowView.setImage(image)
    } else {
      var imageShowView = new GeoFlickr.Views.ImageShow({
        model: image,
        collection: this.images()
       });

      this.swap(imageShowView);
      this.imageShowView = imageShowView;
    }
  },

  userShow: function (id) {
    var user = new GeoFlickr.Models.User({ id: id });
    var userShow = new GeoFlickr.Views.UserShow({ model: user });
    user.fetch();

    this.swap(userShow);
  },

  swap: function (newView, welcomeNav) {
    this.imageShowView = null;

    if (welcomeNav) {
      this.$navBar.addClass("welcome");
    } else {
      this.$navBar.removeClass("welcome");
    }
    // temporary
    $("#tag-dropdown").empty();
    this.currentView && this.currentView.remove();
    this.currentView = newView;
    this.$rootContent.html(newView.$el);
    newView.render()

    return newView;
  }
});
