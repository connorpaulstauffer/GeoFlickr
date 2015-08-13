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
    // at least one image has to be in the container before triggering onMasonry
    if (!this._masonryCalled) {
      this.callMasonry();
      this._masonryCalled = true;
    }
  },

  callMasonry: function () {
    this.$("#photo-grid").imagesLoaded(function () {
       return $("#photo-grid").masonry({
          itemSelector: ".box",
          columnWidth: function (containerWidth) {
          return containerWidth / 3;
        }
      })
    })
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
});
