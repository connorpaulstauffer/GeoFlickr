GeoFlickr.Views.ImageShow = Backbone.CompositeView.extend({
  template: JST["images/image_show"],

  className: "container-fluid image-show-container",

  initialize: function () {
    // this.listenTo(this.model, "sync", this.render);
    this.addImageCarousel();
  },

  addImageCarousel: function () {
    var imageCarousel = new GeoFlickr.Views.ImageCarousel({
      activeImage: this.model,
      images: this.model.userImages()
    });

    this.addSubview("#image-carousel-container", imageCarousel);
  },

  render: function () {
    var content = this.template()
    this.$el.html(content);
    this.attachSubviews();
    this.onRender();

    return this;
  }
});
