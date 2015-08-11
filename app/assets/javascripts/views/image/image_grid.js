GeoFlickr.Views.ImageGrid = Backbone.CompositeView.extend({
  template: JST['images/image_grid'],

  initialize: function () {
    this.collection.each(this.addImageGridItem.bind(this));
    this.listenTo(this.collection, "add", this.addImageGridItem.bind(this))
  },

  addImageGridItem: function (image) {
    var imageGridItem = new GeoFlickr.Views.ImageGridItem({
      model: image
    });
    this.addSubview("#photo-grid", imageGridItem);
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();

    return this;
  }
});
