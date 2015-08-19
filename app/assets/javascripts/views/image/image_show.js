GeoFlickr.Views.ImageShow = Backbone.CompositeView.extend({
  template: JST["images/image_show"],

  className: "container-fluid image-show-container",

  initialize: function () {
    // this.listenTo(this.model, "sync", this.render);
    this.addImageCarousel();
    this.addUserInfo();
    this.addComments();
  },

  addImageCarousel: function () {
    var imageCarousel = new GeoFlickr.Views.ImageCarousel({
      activeImage: this.model,
      images: this.model.userImages()
    });

    this.addSubview("#image-carousel-container", imageCarousel);
  },

  addMap: function () {
    if (this._map) { return; }
    this.imageShowMap = new GeoFlickr.Views.ImageShowMap({
      model: this.model
    });
    this.$("#image-show-map-container").html(this.imageShowMap.$el);
    this.imageShowMap.initializeMap();
  },

  addComments: function () {
    var comments = new GeoFlickr.Views.CommentIndex({
      collection: this.model.comments(),
      image: this.model
    })

    this.addSubview("#comments-container", comments);
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
    this.addMap();
    this.onRender();

    return this;
  }
});
