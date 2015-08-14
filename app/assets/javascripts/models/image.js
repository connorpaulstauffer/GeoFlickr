GeoFlickr.Models.Image = Backbone.Model.extend({
  urlRoot: "api/images",

  favorite: function () {
    if (!this._favorite) {
      this._favorite = new GeoFlickr.Models.Favorite();
    }
    return this._favorite;
  },

  isFavorited: function () {
    return !this.favorite().isNew();
  },

  tags: function () {
    if (!this._tags) {
      this._tags = new GeoFlickr.Collections.Tags();
    }
    return this._tags;
  },

  parse: function (response) {
    if (response.favorite) {
      this.favorite().set(response.favorite);
      delete response.favorite
    }

    if (response.tags) {
      this.tags().set(response.tags);
      delete response.tags;
    }
    return response;
  }
});
