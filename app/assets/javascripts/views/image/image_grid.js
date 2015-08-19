GeoFlickr.Views.ImageGrid = Backbone.CompositeView.extend({
  template: JST['images/image_grid'],

  attributes: { "id": "image-grid-contents" },

  initialize: function (options) {
    if (options.imageIndex) {
      this._imageIndex = options.imageIndex;
    }
  },

  displayNoResultsAlert: function () {
    this.$("#no-images-alert-container").removeClass("hidden");
    var noImagesAlert = new GeoFlickr.Views.NoImagesAlert();
    this.noImagesAlert = noImagesAlert;
    this.addSubview("#no-images-alert-container", noImagesAlert);
  },

  addImageGridItem: function (image) {
    this.$("#no-images-alert-container").addClass("hidden");
    if ( this.noImagesAlert ) {
      this.removeSubview("#no-images-alert-container", this.noImagesAlert);
    }
    var imageGridItem = new GeoFlickr.Views.ImageGridItem({
      model: image,
      imageGrid: this
    });

    this.addSubview(".photo-grid", imageGridItem);

    this.$imageGrid.imagesLoaded(function() {
      this.$imageGrid.masonry("appended", imageGridItem.$el);
    }.bind(this));
  },

  removeImageGridItem: function (image) {
    this.removeModelSubview(".photo-grid", image);
    // you could probably use the masonry remove method here
    this.$imageGrid.masonry("reload");
  },

  initializeMasonry: function () {
    this.$imageGrid = this.$(".photo-grid");

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
    if (this._imageIndex) {
      this._imageIndex.activateImage(id);
    }
  },

  deactivateImage: function (id) {
    if (this._imageIndex) {
      this._imageIndex.deactivateImage(id);
    }
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();

    return this;
  },

  onRender: function () {
    this.initializeMasonry();
    if (this.collection.length == 0 && this._imageIndex) {
      this.displayNoResultsAlert();
    }
    this.collection.each(this.addImageGridItem.bind(this));
    this.listenTo(this.collection, "add", this.addImageGridItem.bind(this))
    this.listenTo(this.collection, "remove", this.removeImageGridItem.bind(this))
  }
});
