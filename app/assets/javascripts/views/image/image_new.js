GeoFlickr.Views.ImageNew = Backbone.CompositeView.extend({
  template: JST['images/image_new'],

  attributes: { "id": "image-upload" },

  initialize: function () {
    this._modal = new Backbone.BootstrapModal({
      content: this,
      title: 'Upload Images',
      okText: 'Upload',
      focusOk: false,
      cancelText: false,
      animate: true,
      okCloses: false
    }).open(this.uploadImages.bind(this));

    this._modal.$el.find(".modal-dialog").addClass("large");
    this.attachJQueryFileUpload();
  },

  attachJQueryFileUpload: function () {
    var that = this;
    this._images = [];
    var invalid = [];

    this.$el.fileupload({
      dataType: "json",

      add: function (event, data) {
        var file = data.files[0];
        var uploadProgress = new GeoFlickr.Views.ImageProgress({
          data: data,
          event: event
        });
        that.addSubview("#progress-bars", uploadProgress);
        data.submit();
      },

      progress: function (event, data) {
        var progressId = "#" + data.files[0].name.split(".")[0]
        var progressId = "#" + _.without(
          data.files[0].name.split(""),
          ".", ":", "(", ")", "/", "\\", "-", " "
        ).join("");
        var bar = that.$(progressId);
        var width = parseInt(data.loaded / data.total * 100, 10);
        bar.css("width", width + "%");
      },

      success: function (model) {
        var image = new GeoFlickr.Models.Image(model);
        that._images.push(image);
        // that.collection.add(image);
        // that.collection.get()
      },

      error: function () {
        debugger;
      }
    });
  },

  uploadImages: function () {
    var imageForm = new GeoFlickr.Views.ImageFormFlow({
      collection: this.collection,
      newImages: this._images,
      modal: this._modal
    })
    this.$("#image-upload-container").css("display", "none");
    this.$("#image-upload-controls").css("display", "none");
    this.addSubview("#image-form-flow-container", imageForm);

  },

  render: function () {
    var content = this.template();
    this.$el.html(content);

    return this;
  }
});
