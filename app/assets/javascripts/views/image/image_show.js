GeoFlickr.Views.ImageShow = Backbone.CompositeView.extend({
  template: JST["images/image_show"],

  className: "container-fluid image-show-container",

  initialize: function () {
    this.addImageCarousel();
    this.addUserInfo();
    this.addComments();
    this.addImageStats();
    this.addImageAddress();
  },

  setImage: function (image) {
    this.model = image;
    this.$("#image-show-map-container").empty();
    this.imageShowMap.remove();

    this.removeSubview("#comments-container", this.comments);
    this.removeSubview("#user-info-container", this.userInfo);
    this.removeSubview("#image-stats-container", this.imageStats);

    this.addMap();
    this.addComments();
    this.addUserInfo();
    this.addImageStats();
    this.comments.onRender();
  },

  addImageAddress: function () {
    if (this.model.get("address")) {
      this.$("#image-address-link").html(this.model.get("address"));
    } else {
      this.listenToOnce(this.model, "change:address", this.addImageAddress);
    }
  },

  addImageStats: function () {
    this.imageStats = new GeoFlickr.Views.ImageStats({
      model: this.model
    })

    this.addSubview("#image-stats-container", this.imageStats);
  },

  addImageCarousel: function () {
    var imageCarousel = new GeoFlickr.Views.ImageCarousel({
      activeImage: this.model,
      images: this.collection
    });

    this.addSubview("#image-carousel-container", imageCarousel);
  },

  addMap: function () {
    this.imageShowMap = new GeoFlickr.Views.ImageShowMap({
      model: this.model
    });

    this.$("#image-show-map-container").html(this.imageShowMap.$el);
    this.imageShowMap.initializeMap();
  },

  addComments: function () {
    this.comments = new GeoFlickr.Views.CommentIndex({
      collection: this.model.comments(),
      image: this.model
    })

    this.addSubview("#comments-container", this.comments);
  },

  addUserInfo: function () {
    this.userInfo = new GeoFlickr.Views.UserInfo({
      model: this.model.user()
    });

    this.addSubview("#user-info-container", this.userInfo);
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
