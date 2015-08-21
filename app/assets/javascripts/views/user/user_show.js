GeoFlickr.Views.UserShow = Backbone.CompositeView.extend({
  template: JST["users/user_show"],

  events: {
    "click #user-images-link": "addUserImages",
    "click #user-favorites-link": "addFavoriteImages"
  },

  initialize: function () {
    this.addUserImagesLoading();
    this.addUserFavoritesLoading();
    this.listenTo(this.model, "sync", this.addUserImages);

    this.addUserBanner();
  },

  addUserImagesLoading: function () {
    this.userImagesLoading = new GeoFlickr.Views.Loading();
    this.addSubview("#user-images-container", this.userImagesLoading);
  },

  showUserImagesLoading: function () {
    this._userImages && this._userImages.hide();
    var height = $( window ).height() - 413
    this.$("#user-images-container").css("min-height", height);
    this.userImagesLoading.setHeight(height);
    this.userImagesLoading.show();
    this.userImagesLoading.appendSpinner();
  },

  showUserFavoritesLoading: function () {
    this._userFavorites && this._userFavorites.hide();
    var height = $( window ).height() - 413
    this.$("#user-images-container").css("min-height", height);
    this.userFavoritesLoading.setHeight(height);
    this.userFavoritesLoading.show();
    this.userFavoritesLoading.appendSpinner();
  },

  addUserFavoritesLoading: function () {
    this.userFavoritesLoading = new GeoFlickr.Views.Loading();
    this.addSubview("#user-favorites-container", this.userFavoritesLoading);
  },

  hideLoading: function () {
    if (this.userStream) {
      this.userImagesLoading.hide();
      this._userImages.show();
    } else {
      this.userFavoritesLoading.hide();
      this._userFavorites.show();
    }
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
      this._userImages = new GeoFlickr.Views.ImageGrid({
        collection: this.model.images(),
        parent: this
      });

      this.addSubview("#user-images-container", this._userImages);
      this._userImages.onRender();
    }

    this.$("#user-favorites-container").css("display", "none");
    this.$("#user-images-container").removeAttr("style");
    this.userStream = true;
  },

  addFavoriteImages: function () {
    this.userStream = false;
    if (this.$("#user-favorites-link").hasClass("active")) { return; }
    this.$("#user-images-link").removeClass("active")
    this.$("#user-favorites-link").addClass("active")

    if (!this._userFavorites) {
      this.showUserFavoritesLoading();
      var userFavorites = new GeoFlickr.Views.ImageGrid({
        collection: this.model.favoriteImages(),
        parent: this
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
    this.showUserImagesLoading();
    Backbone.CompositeView.prototype.onRender.call(this);
  }
});
