GeoFlickr.Views.ImageIndex = Backbone.CompositeView.extend({
  template: JST['images/image_index'],

  className: "row",

  // events: {
  //   "click #submit-search": "search"
  // },

  initialize: function () {
    this.addImageGrid();
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
    var imageGrid = new GeoFlickr.Views.ImageGrid({
      collection: this.collection,
      imageIndex: this
    });
    this.addSubview("#photo-grid-container", imageGrid);
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

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();
    this.addMap();
    this.addTagDropdown();
    this.onRender();

    return this;
  }
});
