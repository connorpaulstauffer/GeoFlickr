GeoFlickr.Views.ImageNew = Backbone.View.extend({
  template: JST['images/image_new'],

  tagName: 'form',

  attributes: {
    "enctype": "multipart/form-data"
  },

  initialize: function () {
    var modal = new Backbone.BootstrapModal({
      content: this,
      title: 'Upload Image',
      okText: 'Upload',
      focusOk: false,
      cancelText: false,
      animate: true,
      okCloses: false
    }).open(this.createImage.bind(this));
  },

  createImage: function () {
    var formData = this.$el.serializeJSON();
    debugger;
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);

    return this;
  }
});
