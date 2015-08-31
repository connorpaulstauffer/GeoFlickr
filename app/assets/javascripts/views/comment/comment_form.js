GeoFlickr.Views.CommentForm = Backbone.View.extend({
  template: JST["comments/comment_form"],

  className: "row comment-form-row",

  events: {
    "focus textarea": "renderSubmitButton",
    "blur textarea": "hideSubmitButton",
    "mousedown #submit-comment": "submitComment",
    "click #submit-comment": "preventDefaultSubmit",
    "keydown textarea": "handleKeyPress"
  },

  initialize: function (options) {
    this._image = options.image;
    this.listenTo(currentUser, "change", this.render);
  },

  renderSubmitButton: function () {
    this.$("#submit-comment").removeClass("hidden");
  },

  hideSubmitButton: function () {
    this.$("#submit-comment").addClass("hidden");
  },

  attachAvatar: function () {
    if (currentUser && currentUser.get("avatar")) {
      var url = currentUser.get("avatar").avatar.micro.url;
      var img = $("<img class='img-circle'>");
      img.attr("src", url);
      this.$(".avatar").html(img);
    }
  },

  submitComment: function (event) {
    event.preventDefault();
    var formData = this.$("form").serializeJSON();
    formData.comment.image_id = this._image.id;
    this.$("textarea").val("");
    this.collection.create(formData, {
      wait: true
    });
  },

  preventDefaultSubmit: function (event) {
    event.preventDefault();
  },

  handleKeyPress: function (event) {
    if (event.which === 13) {
      this.submitComment(event);
    }
  },

  render: function () {
    var content = this.template({
      currentUser: currentUser
    });
    this.$el.html(content);
    this.attachAvatar();

    return this;
  }
});
