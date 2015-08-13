GeoFlickr.Views.SearchControls = Backbone.View.extend({
  template: JST["search/search_controls"],

  className: "col-sm-12",

  render: function () {
    var content = this.template();
    this.$el.html(content);

    return this;
  }
});
