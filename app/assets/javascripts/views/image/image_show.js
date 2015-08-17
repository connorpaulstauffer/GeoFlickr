GeoFlickr.Views.ImageShow = Backbone.CompositeView.extend({
  template: JST["images/image_show"],

  className: "container-fluid image-show-container",

  initialize: function () {
    // this.listenTo(this.model, "sync", this.render);
    this.addImageCarousel();
    this.addUserInfo();
  },

  addImageCarousel: function () {
    var imageCarousel = new GeoFlickr.Views.ImageCarousel({
      activeImage: this.model,
      images: this.model.userImages()
    });

    this.addSubview("#image-carousel-container", imageCarousel);
  },

  addUserInfo: function () {
    var userInfo = new GeoFlickr.Views.UserInfo({
      model: this.model.user()
    });

    this.addSubview("#user-info-container", userInfo);
  },

  render: function () {
    var content = this.template()
    this.$el.html(content);
    this.attachSubviews();
    this.onRender();

    return this;
  }
});
