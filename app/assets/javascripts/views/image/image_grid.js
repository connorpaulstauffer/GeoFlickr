GeoFlickr.Views.ImageGrid = Backbone.CompositeView.extend({
  template: JST['images/image_grid'],

  initialize: function (options) {
    this._imageIndex = options.imageIndex;
    // this.listenTo(this.collection, "remove", this.removeImageGridItem.bind(this))
  },

  addImageGridItem: function (image) {
    var imageGridItem = new GeoFlickr.Views.ImageGridItem({
      model: image,
      imageGrid: this
    });

    this.addSubview("#photo-grid", imageGridItem);

    this.$imageGrid.imagesLoaded(function() {
      this.$imageGrid.masonry("appended", imageGridItem.$el);
    }.bind(this));
  },

  // removeImageGridItem: function (image) {
  //   this.removeModelSubview("#photo-grid", image);
  //   this.callMasonry();
  // },

  initializeMasonry: function () {
    this.$imageGrid = $("#photo-grid");

    this.$imageGrid.imagesLoaded(function () {
      this.$imageGrid.masonry({
        itemSelector: ".box",
        columnWidth: function (containerWidth) {
          return containerWidth / 3;
        }
      })
    }.bind(this))
  },

  activateImage: function (id) {
    this._imageIndex.activateImage(id);
  },

  deactivateImage: function (id) {
    this._imageIndex.deactivateImage(id);
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();

    return this;
  },

  onRender: function () {
    this.initializeMasonry();
    // this.collection.each(this.addImageGridItem.bind(this));
    this.listenTo(this.collection, "add", this.addImageGridItem.bind(this))
  }
});
