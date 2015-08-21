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

  addImageGridItem: function (image, stopLoading) {
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
      this.$imageGrid.masonry();
      if (stopLoading) { this._imageIndex.hideLoading() }
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
        percentPosition: true,
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

  reloadMasonry: function () {
    // this.$imageGrid.masonry();
    // this.$imageGrid.masonry("reloadItems");
  },

  addAllImages: function () {
    var imagesLength = this.collection.length;
    for (var i = 0; i < imagesLength; i++) {
      var stopLoading = (i == imagesLength - 1)
      var image = this.collection.models[i];
      this.addImageGridItem(image, stopLoading)
    }
  },

  hide: function () {
    this.$el.css("visibility", "hidden")
  },

  show: function () {
    this.$el.css("visibility", "visible")
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
      this._imageIndex.hideLoading();
    }

    this.addAllImages();
    // this.listenTo(this.collection, "add", this.addImageGridItem.bind(this))
    this.listenTo(this.collection, "sync", this.addAllImages);
    // this.listenTo(this.collection, "remove", this.removeImageGridItem.bind(this))

    $( window ).on("resize", this.reloadMasonry.bind(this));
    Backbone.CompositeView.prototype.onRender.call(this);
  }
});
