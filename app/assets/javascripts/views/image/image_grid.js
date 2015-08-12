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
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    // Fix this with onRender
    setTimeout(this.callMasonry.bind(this), 400)
    // this.onRender();

    return this;
  }

  // onRender: function () {
  //   this.callMasonry();
  //   Backbone.CompositeView.prototype.onRender.call(this);
  // }
});
