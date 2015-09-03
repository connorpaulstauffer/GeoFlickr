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
    var height;
    var scrollTop = $( window ).scrollTop();
    if (scrollTop > 413) {
      height = $( window ).height();
      scrollTop -= 413;
    } else {
      height = $( window ).height() - 413;
      scrollTop = 0;
    }
    this.$("#user-images-container").css("min-height", height);
    this.userImagesLoading.setDimensions(height, scrollTop);
    this.userImagesLoading.show();
    this.userImagesLoading.appendSpinner();
  },

  showUserFavoritesLoading: function () {
    this._userFavorites && this._userFavorites.hide();
    var height;
    var scrollTop = $( window ).scrollTop();
    if (scrollTop > 413) {
      height = $( window ).height();
      scrollTop -= 413;
    } else {
      height = $( window ).height() - 413;
      scrollTop = 0;
    }
    this.$("#user-images-container").css("min-height", height);
    this.userFavoritesLoading.setDimensions(height, scrollTop);
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
    this.userStream = true;
    if (this.$("#user-images-link").hasClass("active")) { return; }
    this.$("#user-favorites-link").removeClass("active")
    this.$("#user-images-link").addClass("active")

    if (!this._userImages) {
      this._userImages = new GeoFlickr.Views.ImageGrid({
        collection: this.model.images(),
        parent: this,
        isIndex: false
      });

      this.addSubview("#user-images-container", this._userImages);
      this.showUserImagesLoading();
      this._userImages.onRender();
    } else {
      this.showUserImagesLoading();
      this.model.fetchImages(function (collection) {
        this._userImages.resetCollection(collection)
      }.bind(this))
    }

    this.$("#user-favorites-container").css("display", "none");
    this.$("#user-images-container").removeAttr("style");
  },

  addFavoriteImages: function () {
    this.userStream = false;
    if (this.$("#user-favorites-link").hasClass("active")) { return; }
    this.$("#user-images-link").removeClass("active")
    this.$("#user-favorites-link").addClass("active")

    if (!this._userFavorites) {
      this._userFavorites = new GeoFlickr.Views.ImageGrid({
        collection: this.model.favoriteImages(),
        parent: this,
        isIndex: false,
        isFavorites: true
      });

      this.showUserFavoritesLoading();
      this.addSubview("#user-favorites-container", this._userFavorites);
      this._userFavorites.onRender();
    } else {
      this.showUserFavoritesLoading();
      this.model.fetchFavoriteImages(function (collection) {
        this._userFavorites.resetCollection(collection)
      }.bind(this));
    }

    this.$("#user-images-container").css("display", "none");
    this.$("#user-favorites-container").removeAttr("style");
  },

  updateCurrentUserFavorites: function () {
    this.showUserFavoritesLoading();
    this.model.fetchFavoriteImages(function (collection) {
      this._userFavorites.resetCollection(collection)
    }.bind(this));
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
    Backbone.CompositeView.prototype.onRender.call(this);
  }
});
