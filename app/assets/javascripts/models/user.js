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

  fetchFavoriteImages: function (user, callback) {
    $.ajax({
      url: "api/users/" + user.id + "/favorite_images",
      success: function (response) {
        user.favoriteImages().set(response.images);
        callback && callback();
      }
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
