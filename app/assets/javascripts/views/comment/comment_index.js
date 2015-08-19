GeoFlickr.Views.CommentIndex = Backbone.CompositeView.extend({
  template: JST['comments/comment_index'],

  initialize: function (options) {
    this._image = options.image
  },

  addCommentItem: function (comment) {
    var commentItem = new GeoFlickr.Views.CommentItem({
      model: comment
    })

    this.addSubview("#comment-items", commentItem);
  },

  addCommentForm: function () {
    var commentForm = new GeoFlickr.Views.CommentForm({
      collection: this.collection,
      image: this._image
    })

    this.addSubview("#comment-form", commentForm);
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
    this.addCommentForm();
  }
})
