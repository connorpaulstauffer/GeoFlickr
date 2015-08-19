GeoFlickr.Views.CommentItem = Backbone.View.extend({
  template: JST["comments/comment_item"],

  className: "row comment-row",

  initialize: function () {
    this.listenTo(this.model.user(), "change", function () {
      debugger;
      this.render()
    });
  },

  attachAvatar: function () {
    if (!this.model.user().id) { return; }
    if (this.model.user().get("avatar")) {
      var url = this.model.user().get("avatar").avatar.micro.url;
      var img = $("<img class='img-circle'>");
      img.attr("src", url);
      this.$(".avatar").html(img);
    }
  },

  render: function () {
    var content = this.template({
      comment: this.model
    });
    this.$el.html(content);
    this.attachAvatar();

    return this;
  }
})
