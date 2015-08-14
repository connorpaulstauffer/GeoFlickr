GeoFlickr.Views.SearchControls = Backbone.View.extend({
  template: JST["search/search_controls"],

  className: "navbar-form navbar-left",

  tagName: "form",

  attributes: {
    "id": "search-control"
  },

  attachGeocomplete: function () {
    this.$("#index-search-input").geocomplete();
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachGeocomplete();

    return this;
  }
});
