GeoFlickr.Views.ImageGrid = Backbone.CompositeView.extend({
  template: JST['images/image_grid'],

  attributes: { "id": "image-grid-contents" },

  events: {
    "resize": "setupMasonry"
  },

  initialize: function (options) {
    this._parent = options.parent;
    this.isIndex = options.isIndex;
    this.isFavorites = options.isFavorites;
    this.filter_data = options.filter_data;
    $( window ).on("scroll", this.handleScroll.bind(this));
  },

  displayNoResultsAlert: function () {
    this.$("#no-images-alert-container").removeClass("hidden");
    if (!this.noImagesAlert) {
      this.noImagesAlert = new GeoFlickr.Views.NoImagesAlert({
        isIndex: this.isIndex
      });
      this.addSubview("#no-images-alert-container", this.noImagesAlert);
    }
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
      if (stopLoading) {
        this._parent.hideLoading()
      }
    }.bind(this));
  },

  setupMasonry: function () {
    this.$imageGrid = this.$imageGrid || this.$(".photo-grid");

    this.$imageGrid.masonry({
      itemSelector: ".box",
      percentPosition: true,
      columnWidth: function (containerWidth) {
        var numberOfColumns;
        if (containerWidth > 899) {
          numberOfColumns = 3;
          this.$(".box").css("width", "33.23%");
        } else if (containerWidth > 599) {
          numberOfColumns = 2;
          this.$(".box").css("width", "49.9%");
        } else {
          numberOfColumns = 1;
          this.$(".box").css("width", "99.9%");
        }

        this.gridItemWidth = (containerWidth / numberOfColumns) - 0.5;

        return (containerWidth / numberOfColumns);
        return containerWidth / 3;
      }.bind(this)
    })
  },

  activateImage: function (id) {
    this._parent.activateImage && this._parent.activateImage(id);
  },

  deactivateImage: function (id) {
    this._parent.activateImage && this._parent.deactivateImage(id);
  },

  addAllImages: function () {
    this.eachSubview(function (subview) {
      subview.remove();
    });

    var imagesLength = this.collection.length;
    for (var i = 0; i < imagesLength; i++) {
      var stopLoading = (i == imagesLength - 1);
      var image = this.collection.models[i];
      this.addImageGridItem(image, stopLoading)
    }
  },

  updateCurrentUserFavorites: function () {
    if (this.isFavorites) {
      this._parent.updateCurrentUserFavorites();
    }
  },

  hide: function () {
    this.$el.css("visibility", "hidden");
  },

  show: function () {
    this.$el.css("visibility", "visible");
  },

  resetCollection: function (newCollection) {
    this.collection = newCollection;
    if (this.collection.length == 0) {
      this.displayNoResultsAlert();
      this._parent.hideLoading();
    } else {
      this.addAllImages();
    }
  },

  handleScroll: function () {
    if($(window).scrollTop() + $(window).height() == $(document).height()) {
       this.loadNextPage();
    }
  },

  loadNextPage: function () {
    if (this.collection.page < this.collection.total_pages) {
      this.collection.fetch({
        remove: false,
        data: {
          filter_data: this.filter_data,
          page: ++this.collection.page
        }
      })
    }
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();

    return this;
  },

  onRender: function () {
    this.setupMasonry();
    if (this.collection.length == 0) {
      this.displayNoResultsAlert();
      this._parent.hideLoading();
    } else {
      this.addAllImages();
    }

    this.listenTo(this.collection, "sync", this.addAllImages);

    Backbone.CompositeView.prototype.onRender.call(this);
  }
});
