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

  userImages: function () {
    if (!this._userImages) {
      this._userImages = new GeoFlickr.Collections.Images();
    }

    return this._userImages;
  },

  user: function () {
    if (!this._user) {
      this._user = new GeoFlickr.Models.User();
    }

    return this._user;
  },

  comments: function () {
    if (!this._comments) {
      this._comments = new GeoFlickr.Collections.Comments();
    }

    return this._comments;
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

    if (response.user) {
      this.user().set(response.user, { parse: true })
      delete response.user
    }

    if (response.user_images) {
      this.userImages().set(response.user_images)
      delete response.user_images
    }

    if (response.comments) {
      // might need to call parse here
      this.comments().set(response.comments, { parse: true })
      delete response.comments
    }

    return response;
  }
});
