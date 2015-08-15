// GeoFlickr.Views.ImageFormFlow = Backbone.CompositeView.extend({
//   template: JST["images/image_form_flow"],
//
//   events: {
//     "click #right-control": "nextForm",
//     "click #left-control": "previousForm"
//   },
//
//   initialize: function (options) {
//     this._images = options.newImages;
//     this._modal = options.modal;
//     this._index = 0;
//     this._firstRendered = false;
//     // this.addBackToUpload();
//
//     this._tags = new GeoFlickr.Collections.Tags();
//     this._tags.fetch();
//
//     this.setupControls();
//     this._images.forEach(this.renderForm.bind(this));
//     // this.renderForms();
//
//     this.listenTo(this._images, "add", function () {
//       this.renderForm.bind(this);
//       this.setupControls();
//     }.bind(this));
//
//     this._modal.$el.find(".ok").on("click", this.submitForms.bind(this));
//   },
//   //
//   // addBackToUpload: function () {
//   //   this._modal.$el.find(".modal-footer").append($("<button id='back-to-upload'>Back to upload</button>"))
//   //   this._modal.$el.find("#back-to-upload").on("click", this.backToUpload.bind(this));
//   // },
//   //
//   // backToUpload: function () {
//   //   this.$el.css("display", "none");
//   //   $("#image-upload-container").removeAttr("style");
//   //   $("#image-upload-controls").removeAttr("style");
//   //   this._modal.$el.find("#back-to-upload").css("display", "none");
//   // },
//
//   setupControls: function () {
//     // if (this._images.length === 0) { return; }
//     if (this._index === 0) {
//       this.$("#left-control").css("display", "none");
//       this.$("#right-control").removeAttr("style");
//     } else if (this._index === this._images.length - 1) {
//       this.$("#right-control").css("display", "none");
//       this.$("#left-control").removeAttr("style");
//     } else {
//       this.$("#left-control").removeAttr("style");
//       this.$("#right-control").removeAttr("style");
//     }
//   },
//
//
//   renderForm: function (image) {
//     var imageForm = new GeoFlickr.Views.ImageForm({
//       model: image,
//       hidden: this._firstRendered,
//       tags: this._tags
//     });
//     this._firstRendered = true;
//     this.addSubview("#image-form-container", imageForm);
//   },
//
//   currentView: function () {
//     if (!this._currentView) {
//       this._currentView = this.subviews("#image-form-container")
//                             ._wrapped[0]
//     }
//
//     return this._currentView;
//   },
//
//   activateCurrentForm: function () {
//     if (this.currentView()) {
//       this.currentView().deactivate();
//     }
//     this._currentView = this.subviews("#image-form-container")
//                           ._wrapped[this._index];
//     this.currentView().activate();
//     this.setupControls();
//     // double check this
//     this.currentView().addMap();
//   },
//
//   nextForm: function () {
//     this.incrementIndex();
//     this.activateCurrentForm();
//   },
//
//   previousForm: function () {
//     this.decrementIndex();
//     this.activateCurrentForm();
//   },
//
//   incrementIndex: function () {
//     this._index = (this._index + 1) % this._images.length;
//   },
//
//   decrementIndex: function () {
//     this._index = (this._index === 0) ? this._images.length - 1 : this._index - 1;
//   },
//
//   submitForms: function () {
//     var that = this;
//     // what if images have been deleted along the way?
//     var totalimages = this._images.length;
//     var i = 0;
//     this.eachSubview(function (subview, selector) {
//       if (selector === "#image-form-container") {
//         i++;
//         var formData = subview.$el.find("#image-form-data").serializeJSON();
//         if (subview._marker) {
//           formData.image.latitude = subview._marker.position.G;
//           formData.image.longitude = subview._marker.position.K;
//         }
//         subview.model.save(formData, {
//           success: function (image, response) {
//             // this will change
//             // image was in the wrong format. couldn't find thumbnail
//             // that.collection.add(image);
//             if (i === totalimages) {
//               that._modal.close()
//               Backbone.history.navigate("/#");
//             }
//           },
//
//           error: function () {
//             // need to handle errors eventually
//             // destroy model, etc.
//             if (i === totalimages) {
//               Backbone.history.navigate("/#", { trigger: true });
//             }
//           }
//         });
//       }
//     })
//   },
//
//   render: function () {
//     var content = this.template();
//     this.$el.html(content);
//     this.setupControls();
//     this.attachSubviews();
//     // kind of a weird spot for this. try to refactor
//     this.activateCurrentForm();
//
//     return this;
//   }
// })
