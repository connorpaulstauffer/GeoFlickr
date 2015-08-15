GeoFlickr.Views.TagListItem = Backbone.View.extend({
  template: JST["tags/tag_list_item"],

  tagName: "li",

  className: "tag-list-item",

  render: function () {
    var content = this.template({
      tag: this.model
    });
    this.$el.html(content);

    return this;
  }
});
