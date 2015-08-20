GeoFlickr.Collections.Images = Backbone.Collection.extend({
  model: GeoFlickr.Models.Image,

  url: "api/images",

  tags: function () {
    if (!this._tags) {
      this._tags = new GeoFlickr.Collections.Tags();
    }
    return this._tags;
  },

  getOrFetch: function (id) {
    var image = this.get(id) || new GeoFlickr.Models.Image({ id: id })
    image.fetch({
      success: function () {
        // debugger;
      }
    });

    return image;
  },

  parse: function (response) {
    if (response.center) {
      this.center = response.center;
      delete response.center
    }

    if (response.tags) {
      this.tags().set(response.tags);
      delete response.tags;
    }

    return response.images;
  }
});
