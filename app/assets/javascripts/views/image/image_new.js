GeoFlickr.Views.ImageNew = Backbone.CompositeView.extend({
  template: JST['images/image_new'],

  // attributes: {
  //   "enctype": "multipart/form-data",
  //   "action": "api/images",
  //   "method": "post",
  //   "data-remote": "true"
  // },

  initialize: function () {
    var modal = new Backbone.BootstrapModal({
      content: this,
      title: 'Upload Images',
      okText: 'Upload',
      focusOk: false,
      cancelText: false,
      animate: true
      // okCloses: false
    }).open(this.createImages.bind(this));
    this.attachJQueryFileUpload();
  },

  addProgressBar: function () {

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
        var bar = that.$(progressId);
        var width = parseInt(data.loaded / data.total * 100, 10);
        bar.css("width", width + "%");
      },

      success: function (model) {
        that._images.push(model);
      },

      error: function () {
        debugger;
      }
    });
  },

  createImages: function () {
    // Temporary. I will set up the image detail form flow here
    Backbone.history.navigate("", { trigger: true });
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);

    return this;
  }
});
