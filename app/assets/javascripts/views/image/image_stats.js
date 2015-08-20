GeoFlickr.Views.ImageStats = Backbone.View.extend({
  template: JST["images/image_stats"],

  className: "image-stats",

  initialize: function () {
    this.listenTo(this.model, "change", this.render);
    this.listenTo(this.model.comments(), "change", this.render);
  },

  render: function () {
    var content = this.template({
      image: this.model
    })
    this.$el.html(content);

    return this;
  }
})
