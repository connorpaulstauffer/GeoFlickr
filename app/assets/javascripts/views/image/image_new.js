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
    }).open(this.createImage.bind(this));
    this.attachJQueryFileUpload();
  },

  attachJQueryFileUpload: function () {
    var that = this;

    this.$el.fileupload({
      dataType: "json",
      add: function (event, data) {
        var file = data.files[0];
        var uploadProgress = that.progressTemplate({object: file});
        that.$el.append(uploadProgress);
        // debugger;
        data.submit({
          success: function () {
            debugger;
          }
        });
        // $.ajax({
        //   url: "api/images",
        //   type: "POST",
        //   data: data,
        //   success: function (data) {
        //     debugger;
        //   },
        //
        //   error: function (data) {
        //     debugger;
        //   }
        // });
      },

      progress: function (event, data) {
        if (data.context) {
          var progress = parseInt(data.loaded / data.total * 100, 10);
          return data.content.find('.bar').css('width', progress + "%");
        }
      },

      done: function (event, data) {
        debugger;
      }
    });
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
