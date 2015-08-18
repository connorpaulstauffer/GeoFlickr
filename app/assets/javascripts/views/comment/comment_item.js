GeoFlickr.Views.CommentItem = Backbone.View.extend({
  template: JST["comments/comment_item"],

  className: "row comment-row",

  initialize: function () {
    this.listenTo(this.model, "change", this.attachAvatar);
  },

  attachAvatar: function () {
    if (this.model.get("user").avatar) {
      var url = this.model.get("user").avatar.avatar.micro.url;
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
