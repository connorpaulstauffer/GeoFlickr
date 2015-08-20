GeoFlickr.Views.TagIndexItem = Backbone.View.extend({
  template: JST["tags/tag_index_item"],

  events: {
    "click": "searchByTag"
  },

  className: "tag-item-container",

  initialize: function () {
    this.listenTo(this.model, "sync", this.render)
  },

  searchByTag: function () {
    Backbone.history.navigate("images/?tag=" + this.model.id, { trigger: true });
  },

  render: function () {
    var content = this.template({
      tag: this.model
    });
    this.$el.html(content);

    return this;
  }
});
