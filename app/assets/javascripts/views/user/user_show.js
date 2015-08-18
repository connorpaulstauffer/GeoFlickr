GeoFlickr.Views.UserShow = Backbone.CompositeView.extend({
  template: JST["users/user_show"],

  events: {
    "click #user-images-link": "addUserImages",
    "click #user-favorites-link": "addFavoriteImages"
  },

  initialize: function () {
    this.addUserBanner();
    this.addUserImages();
  },

  addUserBanner: function () {
    var userBanner = new GeoFlickr.Views.UserBanner({
      model: this.model
    })

    this.addSubview("#user-banner-container", userBanner);
  },

  handleScroll: function () {
    if ($( window ).scrollTop() > 299) {
      this.$("#user-navbar").addClass("stuck");
    } else {
      this.$("#user-navbar").removeClass("stuck");
    }
  },

  addUserImages: function () {
    if (this.$("#user-images-link").hasClass("active")) { return; }
    this.$("#user-favorites-link").removeClass("active")
    this.$("#user-images-link").addClass("active")

    if (!this._userImages) {
      var userImages = new GeoFlickr.Views.ImageGrid({
        collection: this.model.images()
      });

      this.addSubview("#user-images-container", userImages);
      this._userImages = userImages;
    }

    this.$("#user-favorites-container").css("display", "none");
    this.$("#user-images-container").removeAttr("style");
  },

  addFavoriteImages: function () {
    if (this.$("#user-favorites-link").hasClass("active")) { return; }
    this.$("#user-images-link").removeClass("active")
    this.$("#user-favorites-link").addClass("active")

    if (!this._userFavorites) {
      var userFavorites = new GeoFlickr.Views.ImageGrid({
        collection: this.model.favoriteImages()
      });

      this.addSubview("#user-favorites-container", userFavorites);
      this._userFavorites = userFavorites;
      userFavorites.onRender();
    }

    this.$("#user-images-container").css("display", "none");
    this.$("#user-favorites-container").removeAttr("style");
  },

  render: function () {
    var content = this.template()
    this.$el.html(content);
    this.attachSubviews();
    this.onRender();
    $( window ).on("scroll", this.handleScroll.bind(this));

    return this;
  },

  onRender: function () {
    this.$("#user-images-link").addClass("active");
    Backbone.CompositeView.prototype.onRender.call(this);
  }
});
