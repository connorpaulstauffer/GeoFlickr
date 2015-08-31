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
    image.fetch();

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

    if (response.page) {
      this.page = parseInt(response.page);
      delete response.page;
    }

    if (response.total_pages) {
      this.total_pages = parseInt(response.total_pages);
      delete response.total_pages;
    }

    return response.images;
  }
});
