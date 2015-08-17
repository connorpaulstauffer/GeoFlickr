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

  parse: function (response) {
    if (response.images) {
      this.images().set(response.images, { parse: true });
      delete response.images;
    }

    if (response.favorite_images) {
      this.favoriteImages().set(response.favorite_images);
      delete response.favorite_images;
    }

    return response;
  }
});
