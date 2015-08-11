GeoFlickr.Views.ImageGridItem = Backbone.View.extend({
  className: "box panel panel-default",

  template: JST['images/image_grid_item'],

  // This should not be here!!! Figure out onRender and call it in ImageGrid
  callMasonry: function () {
    $("#photo-grid").imagesLoaded(function () {
      return $("#photo-grid").masonry({
        itemSelector: ".box",
        columnWidth: function (containerWidth) {
          return containerWidth / 3;
        }
      })
    })
  },

  render: function () {
    var content = this.template({ image: this.model });
    this.$el.html(content);
    this.callMasonry();

    return this;
  }
});
