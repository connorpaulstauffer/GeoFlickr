GeoFlickr.Views.UserInfo = Backbone.View.extend({
  template: JST["users/user_info"],

  className: "user-info",

  initialize: function () {
    this.listenTo(this.model, "change", this.render);
  },

  render: function () {
    var content = this.template({
      user: this.model
    })
    this.$el.html(content);

    return this;
  }
})
