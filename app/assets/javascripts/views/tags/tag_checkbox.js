GeoFlickr.Views.TagCheckbox = Backbone.View.extend({
  template: JST["tags/tag_checkbox"],

  className: "tag-checkbox",

  render: function () {
    var content = this.template({
      tag: this.model
    });
    this.$el.html(content);

    return this;
  }
});
