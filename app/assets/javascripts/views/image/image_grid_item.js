GeoFlickr.Views.ImageGridItem = Backbone.View.extend({
  className: "box panel panel-default",

  template: JST['images/image_grid_item'],

  render: function () {
    var content = this.template({ image: this.model });
    this.$el.html(content);

    return this;
  }
});
