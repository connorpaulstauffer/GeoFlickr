GeoFlickr.Views.UserInfo = Backbone.View.extend({
  template: JST["users/user_info"],

  tagName: "a",

  attributes: function () {
    return {
      "href": "#/users/" + this.model.id
    }
  },

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
