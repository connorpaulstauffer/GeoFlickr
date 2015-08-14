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

  parse: function (response) {
    if (response.favorite) {
      this.favorite().set(response.favorite);
    }
    return response;
  }
});
