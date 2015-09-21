GeoFlickr.Views.ImageIndex = Backbone.CompositeView.extend({
  template: JST['images/image_index'],

  className: "row",

  initialize: function (options) {
    this.filter_data = options.filter_data;
    this.addLoading();
    this.listenTo(this.collection, "request", this.removeImageGrid);
    this.listenTo(this.collection, "sync", this.addImageGrid);
  },

  addLoading: function () {
    this.loading = new GeoFlickr.Views.Loading();
    this.addSubview("#photo-grid-container", this.loading)
  },

  addTagDropdown: function () {
    var tagDropdown = new GeoFlickr.Views.TagDropdown({
      mapShow: this._mapShow,
      collection: this.collection
    })

    $("#tag-dropdown").html(tagDropdown.$el);
    tagDropdown.render();
  },

  addImageGrid: function () {
    if (this.imageGrid) {
      this.removeSubview("photo-grid-container", this.imageGrid);
    };

    this.imageGrid = new GeoFlickr.Views.ImageGrid({
      collection: this.collection,
      parent: this,
      isIndex: true,
      filter_data: this.filter_data
    });
    this.addSubview("#photo-grid-container", this.imageGrid);
    this.imageGrid.hide();
    this.imageGrid.onRender();
  },

  removeImageGrid: function () {
    // debugger
    if (!this.imageGrid) { return; }
    this.showLoading();
    this.removeSubview("photo-grid-container", this.imageGrid);
  },

  addMap: function () {
    if (this._mapShow) { return; }
    this._mapShow = new GeoFlickr.Views.MapShow({
      collection: this.collection
    });
    this.$("#map-container").html(this._mapShow.$el);
    this.setMapContainerHeight();
    this._mapShow.initializeMap();
  },

  setMapContainerHeight: function () {
    var windowHeight = $( window ).height();
    var navbarHeight = $(".navbar").height();
    this.$("#map-container").height(windowHeight - navbarHeight);
  },

  activateImage: function (id) {
    this._mapShow.activateMarker(id);
  },

  deactivateImage: function (id) {
    this._mapShow.deactivateMarker(id);
  },

  showLoading: function () {
    this.imageGrid && this.imageGrid.hide();
    var height;
    var scrollTop = $( window ).scrollTop();
    if (scrollTop > 61) {
      height = $( window ).height();
      scrollTop -= 61;
    } else {
      height = $( window ).height() - 61;
      scrollTop = 0;
    }
    this.$("#photo-grid-container").css("min-height", height);
    this.loading.setDimensions(height, scrollTop);
    this.loading.show();
    this.loading.appendSpinner();
  },

  hideLoading: function () {
    this.loading.hide();
    this.imageGrid.show();
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    this.addMap();
    this.addTagDropdown();
    this.onRender();
    this.showLoading();

    return this;
  },

  remove: function () {
    this._mapShow.remove();
    Backbone.CompositeView.prototype.remove.call(this);
  }
});
