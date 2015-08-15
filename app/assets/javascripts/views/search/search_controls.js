GeoFlickr.Views.SearchControls = Backbone.CompositeView.extend({
  template: JST["search/search_controls"],

  attributes: {
    "id": "search-control"
  },

  events: {
    "click #search-icon": "searchByLocation",
    "keydown #index-search-input": "handleSearchKeypress"
  },

  initialize: function (options) {
    this._mapShow = options.mapShow;
    this._geocoder = new google.maps.Geocoder();

    // not sure if this is the right approach
    this.collection.tags().each(this.addTagListItem.bind(this));
    this.listenTo(this.collection.tags(), "add", this.addTagListItem);
    this.listenTo(this.collection.tags(), "remove", this.removeTagListItem);
  },

  addTagListItem: function (tag) {
    var tagListItem = new GeoFlickr.Views.TagListItem({
      model: tag
    })
    this.addSubview("#tag-label-list", tagListItem);
  },

  attachGeocomplete: function () {
    this.$("#index-search-input").geocomplete();
  },

  search: function (event) {
    event.preventDefault();
    debugger;
  },

  handleSearchKeypress: function (event) {
    if (event.which === 9) { event.preventDefault(); }
    if (event.which === 13) {
      event.preventDefault();
      this.searchByLocation();
    }
  },

  searchByLocation: function () {
    // var that = this;
    var location = this.$("#index-search-input").val()

    this.collection.fetch({
      data: { filter_data: { location: location } },

      success: function (collection, response) {
      }.bind(this),

      error: function () {
        debugger;
      }
    })
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachGeocomplete();

    return this;
  }
});
