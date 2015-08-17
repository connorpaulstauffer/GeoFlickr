GeoFlickr.Views.UserBanner = Backbone.CompositeView.extend({
  template: JST["users/user_banner"],

  initialize: function () {
    this.attachBannerImage();
    this.listenTo(this.model, "change", this.attachBannerImage)
  },

  attachBannerImage: function () {
    debugger
    // if (!this.model)
  },

  render: function () {
    debugger
    var content = this.template({
      user: this.model
    })
    this.$el.html(content);
    this.attachSubviews();

    return this;
  }
});
