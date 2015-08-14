GeoFlickr.Views.SearchControls = Backbone.View.extend({
  template: JST["search/search_controls"],

  className: "navbar-form navbar-left",

  tagName: "form",

  attributes: {
    "id": "search-control"
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);

    return this;
  }
});
