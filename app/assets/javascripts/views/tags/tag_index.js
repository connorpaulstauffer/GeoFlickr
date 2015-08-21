GeoFlickr.Views.TagIndex = Backbone.CompositeView.extend({
  template: JST["tags/tag_index"],

  initialize: function () {
    this.collection.each(this.addTagIndexItem.bind(this));
    this.listenTo(this.collection, "add", this.addTagIndexItem);
  },

  addTagIndexItem: function (tag) {
    var indexItem = new GeoFlickr.Views.TagIndexItem({
      model: tag
    });

    this.addSubview("#tag-index-items", indexItem);
    this.show();
  },

  show: function () {
    this.$("#tag-index-header").removeClass("hidden");
    this.$("#tag-index-items").removeClass("hidden");
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();

    return this;
  }
});
