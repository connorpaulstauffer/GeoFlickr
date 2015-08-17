GeoFlickr.Views.TagDropdown = Backbone.CompositeView.extend({
  template: JST["search/tag_dropdown"],

  // attributes: {
  //   "id": "search-control"
  // },

  tagName: "li",

  className: "dropdown",

  events: {
    "click input:checkbox": "handleCheckboxClick"
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

  removeTagListItem: function (tag) {
    this.removeModelSubview("#tag-label-list", tag);
  },

  handleCheckboxClick: function (event) {
    $(event.delegateTarget).find(":checked").each(function (idx, checkbox) {
      if (checkbox !== event.target) {
        $(checkbox).attr("checked", false);
      }
    });
    this.filterByTag(event);
  },

  filterByTag: function (event) {
    var formData = $(event.delegateTarget).find(":checked").serializeJSON();
    if (formData["search"]) {
      var checked = formData["search"]["tag_ids"];
      this._mapShow.filterByTags(checked);
    } else {
      this._mapShow.search();
    }
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);

    return this;
  }
});
