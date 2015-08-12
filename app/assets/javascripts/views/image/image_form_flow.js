GeoFlickr.Views.ImageFormFlow = Backbone.CompositeView.extend({
  template: JST["images/image_form_flow"],

  events: {
    "click #right-control": "nextForm",
    "click #left-control": "previousForm"
  },

  initialize: function (options) {
    this._images = options.newImages;
    this._modal = options.modal;
    this._index = 0;
    this.renderForms();
    this.setupControls();
    this._modal.$el.find(".ok").on("click", this.submitForms.bind(this));
  },

  setupControls: function () {
    if (this._images.length < 2) {
      this.$("#image-form-flow-controls").css("display", "none");
    } else if (this._index === 0) {
      this.$("#left-control").css("display", "none");
      this.$("#right-control").removeAttr("style");
    } else if (this._index === this._images.length - 1) {
      this.$("#right-control").css("display", "none");
      this.$("#left-control").removeAttr("style");
    } else {
      this.$("#left-control").removeAttr("style");
      this.$("#right-control").removeAttr("style");
    }
  },

  renderForms: function () {
    var that = this;
    this._images.forEach(function (image, idx) {
      var hidden = (idx === 0) ? false : true;
      var imageForm = new GeoFlickr.Views.ImageForm({
        model: image,
        hidden: hidden
      });
      that.addSubview("#image-form-container", imageForm);
    });
  },

  currentView: function () {
    if (!this._currentView) {
      this._currentView = this.subviews("#image-form-container")
                            ._wrapped[0]
    }

    return this._currentView;
  },

  activateCurrentForm: function () {
    this.currentView().deactivate();
    this._currentView = this.subviews("#image-form-container")
                          ._wrapped[this._index];
    this.currentView().activate();
    this.setupControls();
  },

  nextForm: function () {
    this.incrementIndex();
    this.activateCurrentForm();
  },

  previousForm: function () {
    this.decrementIndex();
    this.activateCurrentForm();
  },

  incrementIndex: function () {
    this._index = (this._index + 1) % this._images.length;
  },

  decrementIndex: function () {
    this._index = (this._index === 0) ? this._images.length - 1 : this._index - 1;
  },

  submitForms: function () {
    this.subviews("#image-form-container")
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.setupControls();
    this.attachSubviews();

    return this;
  }
})
