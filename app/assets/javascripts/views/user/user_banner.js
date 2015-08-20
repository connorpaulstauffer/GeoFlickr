GeoFlickr.Views.UserBanner = Backbone.View.extend({
  template: JST["users/user_banner"],

  initialize: function () {
    this.listenTo(this.model, "change", this.render);
  },

  attachBannerImage: function () {
    if (!this.model.get("banner")) { return; }
    var url = this.model.get("banner").banner.url;
    var img = $("<img>");
    img.attr("src", url)
    this.$("#banner-image").html(img)
  },

  render: function () {
    var content = this.template({
      user: this.model
    });
    this.$el.html(content);
    this.attachBannerImage();

    return this;
  }
});
