GeoFlickr.Collections.Comments = Backbone.Collection.extend({
  model: GeoFlickr.Models.Comment,

  url: "api/comments"
});
