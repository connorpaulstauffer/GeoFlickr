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

    this._imageForms = {};
    this._progressBars = {};
    this._completedProgressBars = {};

    this._tags = new GeoFlickr.Collections.Tags();
    this._tags.fetch();

    this._anyLoaded = false;
    this._modal.$el.find(".modal-dialog").addClass("large");
    // this._modal.$el.find(".ok").on("click", this.uploadImages.bind(this));
    this.attachJQueryFileUpload();
  },

  attachJQueryFileUpload: function () {
    var that = this;

    this.$el.fileupload({
      dataType: "json",

      add: function (event, data) {
        var file = data.files[0];
        var uploadProgress = new GeoFlickr.Views.ImageProgress({
          data: data,
          event: event
        });
        that.addSubview("#progress-bars", uploadProgress);
        that._progressBars[data.files[0].name] = uploadProgress;
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
        var fileName = model.image.url.split("/").reverse()[0];
        var progressBar = this._progressBars[fileName];
        this._completedProgressBars[model.id] = progressBar;
        progressBar.makeSelectable(this, model);

        this.addImageForm(model);
        // this._images.push(image);
        // this._anyLoaded = true;
        // that.collection.add(image);
        // that.collection.get()
      }.bind(this),

      error: function () {
        debugger;
      }
    });
  },

  addImageForm: function (image) {
    // add image form to container
    var image = new GeoFlickr.Models.Image(image);
    var imageForm = new GeoFlickr.Views.ImageForm({
      model: image,
      tags: this._tags
    });

    this.addSubview("#image-forms", imageForm);
    this._imageForms[image.id] = imageForm;

    if (!this._anyLoaded) {
      this.displayForm(image);
      this._anyLoaded = true;
      this._completedProgressBars[image.id].activate();
      this._activeImage = image;
    }
  },

  displayForm: function (image) {
    if (this._activeImage) {
      this.hideActiveImageForm();
    }
    this.$("#upload-column").css("display", "none");
    this._imageForms[image.id].display();
    this._imageForms[image.id].addMap();
    this._activeImage = image;
  },

  hideActiveImageForm: function () {
    this._completedProgressBars[this._activeImage.id].deactivate();
    this._imageForms[this._activeImage.id].deactivate();
  },

  uploadImages: function () {
    var numberOfImages = _(this._progressBars).keys().length;
    if (numberOfImages > _(this._completedProgressBars).keys().length) {
      return;
    }

    var i = 0;
    this.subviews("#image-forms").each(function (form) {
      i++;

      var formData = form.$el.find("form").serializeJSON();
      if (form._marker) {
        formData.image.latitude = form._marker.position.G;
        formData.image.longitude = form._marker.position.K;

        form.model.save(formData, {
          success: function (image, response) {
            // this will change
            // image was in the wrong format. couldn't find thumbnail
            // this.collection.add(image);
            if (i === numberOfImages) {
              this._modal.close()
              Backbone.history.navigate("/#");
            }
          }.bind(this),

          error: function () {
            // need to handle errors eventually
            // destroy model, etc.
            if (i === numberOfImages) {
              Backbone.history.navigate("/#", { trigger: true });
            }
          }.bind(this)
        });
      }
    }.bind(this))
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();

    return this;
  }
});
