GeoFlickr.Collections.Images = Backbone.Collection.extend({
  model: GeoFlickr.Models.Image,

  url: "api/images"
});
