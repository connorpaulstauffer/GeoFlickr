GeoFlickr.Views.UserShow = Backbone.CompositeView.extend({
  template: JST["users/user_show"],

  initialize: function () {
    this.addUserBanner();
  },

  addUserBanner: function () {
    var userBanner = new GeoFlickr.Views.UserBanner({
      model: this.model
    })

    this.addSubview("#user-banner-container", userBanner);
  },

  render: function () {
    var content = this.template()
    this.$el.html(content);
    this.attachSubviews();

    return this;
  }
});
