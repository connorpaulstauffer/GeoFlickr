GeoFlickr.Views.CommentIndex = Backbone.CompositeView.extend({
  template: JST['comments/comment_index'],

  addCommentItem: function (comment) {
    var commentItem = new GeoFlickr.Views.CommentItem({
      model: comment
    })

    this.addSubview("#comment-items", commentItem);
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();

    return this;
  },

  onRender: function () {
    this.collection.each(this.addCommentItem.bind(this));
    this.listenTo(this.collection, "add", this.addCommentItem.bind(this));
  }
})
