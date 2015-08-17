GeoFlickr.Views.UserShow = Backbone.CompositeView.extend({
  template: JST["users/user_show"],

  initialize: function () {
    this.addUserBanner();
    this.addUserImages();
  },

  addUserBanner: function () {
    var userBanner = new GeoFlickr.Views.UserBanner({
    model: this.model
    })

    this.addSubview("#user-banner-container", userBanner);
  },

  addUserImages: function () {
    if (this._currentView) {
      this.removeSubview("#user-content-container", this._currentView);
    }

    var imageGrid = new GeoFlickr.Views.ImageGrid({
      collection: this.model.images()
    });

    this.addSubview("#user-content-container", imageGrid);
    this._currentView = imageGrid;
  },

  render: function () {
    var content = this.template()
    this.$el.html(content);
    this.attachSubviews();
    this.onRender();

    return this;
  }
});
