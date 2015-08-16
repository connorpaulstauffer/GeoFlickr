GeoFlickr.Views.PrimaryImage = Backbone.View.extend({
  template: JST["images/image_primary"],

  attributes: { "id": "primary-image-container" },

  // events: {
  //   "load #image-source": "render"
  // },

  initialize: function () {
    // this.listenTo(this.model, "sync", this.render);
    // this.$el.find("img").on("load", this.render.bind(this))
  },

  render: function () {
    // debugger
    var content = this.template({
      image: this.model
    })
    this.$el.html(content);

    return this;
  }

  // onRender: function () {
  //   debugger
  //   var parentHeight = this.$el.parent().height();
  //   this.$el.height(parentHeight);
  // }
});
