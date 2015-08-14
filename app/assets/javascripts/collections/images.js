GeoFlickr.Collections.Images = Backbone.Collection.extend({
  model: GeoFlickr.Models.Image,

  url: "api/images",

  parse: function (response) {
    this.center = response.center;
    return response.images;
  }
});
