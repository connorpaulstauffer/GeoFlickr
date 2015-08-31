GeoFlickr.Models.User = Backbone.Model.extend({
  urlRoot: "api/users",

  images: function () {
    if (!this._images) {
      this._images = new GeoFlickr.Collections.Images();
    }

    return this._images;
  },

  favoriteImages: function () {
    if (!this._favoriteImages) {
      this._favoriteImages = new GeoFlickr.Collections.Images();
    }

    return this._favoriteImages;
  },

  fetchFavoriteImages: function (callback) {
    $.ajax({
      url: "api/users/" + this.id + "/favorite_images",
      success: function (response) {
        this.favoriteImages().set(response, { parse: true });
        callback && callback(this.favoriteImages());
      }.bind(this)
    })
  },

  fetchImages: function (callback) {
    $.ajax({
      url: "api/users/" + this.id + "/images",
      success: function (response) {
        this.images().set(response, { parse: true });
        callback && callback(this.images());
      }.bind(this)
    })
  },

  parse: function (response) {
    if (response.images) {
      collectionResponse = {};
      collectionResponse["images"] = response.images
      this.images().set(collectionResponse, { parse: true });
      delete response.images;
    }

    if (response.favorite_images) {
      collectionResponse = {};
      collectionResponse["images"] = response.favorite_images
      this.favoriteImages().set(collectionResponse, { parse: true });
      delete response.favorite_images;
    }

    return response;
  }
});
