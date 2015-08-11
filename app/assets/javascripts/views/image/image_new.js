GeoFlickr.Views.ImageNew = Backbone.View.extend({
  template: JST['images/image_new'],

  progressTemplate: JST['images/image_progress'],

  tagName: 'form',

  attributes: {
    "enctype": "multipart/form-data",
    "action": "api/images",
    "method": "post",
    "data-remote": "true"
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
    }).open(this.createImages.bind(this));
    this.attachJQueryFileUpload();
  },

  attachJQueryFileUpload: function () {
    var that = this;
    this._images = [];
    var invalid = [];

    this.$el.fileupload({
      dataType: "json",

      progressInterval: 50,

      add: function (event, data) {
        var file = data.files[0];
        var uploadProgress = that.progressTemplate({object: file});
        that.$el.append(uploadProgress);
        data.submit();
      },

      success: function (model) {
        that._images.push(model);
      },

      error: function () {
        debugger;
      },

      progress: function (event, data) {
        var progress = parseInt(data.loaded / data.total * 100, 10);
        return $(data.form.context).find('.bar').css('width', progress + "%");
      }
    });
  },

  createImages: function () {
    // Temporary. I will set up the image detail form flow here
    Backbone.history.navigate("");
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);

    return this;
  }
});
