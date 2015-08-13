GeoFlickr.Views.ImageGrid = Backbone.CompositeView.extend({
  template: JST['images/image_grid'],

  initialize: function () {
    this.collection.each(this.addImageGridItem.bind(this));
    this.listenTo(this.collection, "add", this.addImageGridItem.bind(this))
    this.listenTo(this.collection, "remove", this.removeImageGridItem.bind(this))
  },

  addImageGridItem: function (image) {
    var imageGridItem = new GeoFlickr.Views.ImageGridItem({
      model: image
    });

    this.addSubview("#photo-grid", imageGridItem);
    this.callMasonry();
  },

  removeImageGridItem: function (image) {
    this.removeModelSubview("#photo-grid", image);
    this.callMasonry();
  },

  callMasonry: function () {
    // change this so it is only called for last image
    this.$("#photo-grid").masonry('destroy');

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
