GeoFlickr.Models.Comment = Backbone.Model.extend({
  urlRoot: "api/comments",

  user: function () {
    if (!this._user) {
      this._user = new GeoFlickr.Models.User();
    }

    return this._user;
  },

  parse: function () {
    if (response.user) {
      this.user().set(response.user);
      delete response.user;
    }

    return response;
  }
});
