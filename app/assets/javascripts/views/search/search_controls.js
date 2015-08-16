GeoFlickr.Views.SearchControls = Backbone.CompositeView.extend({
  template: JST["search/search_controls"],

  attributes: {
    "id": "search-control"
  },

  events: {
    "click #search-icon": "searchByLocation",
    "keydown #index-search-input": "handleSearchKeypress",
    "change input:checkbox": "filterByTags"
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

  searchByLocation: function () {
    event.preventDefault();
    this._mapShow.searchByLocation(this.$("#index-search-input").val());
  },

  handleSearchKeypress: function (event) {
    if (event.which === 9) { event.preventDefault(); }
    if (event.which === 13) {
      event.preventDefault();
      this._mapShow.searchByLocation(this.$("#index-search-input").val());
    }
  },

  filterByTags: function (event) {
    var checked = $(event.delegateTarget).find(":checked").serializeJSON()["search"]["tag_ids"];
    this._mapShow.filterByTags(checked);
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachGeocomplete();

    return this;
  }
});
