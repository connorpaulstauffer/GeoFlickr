GeoFlickr.Views.ImageFormFlow = Backbone.CompositeView.extend({
  template: JST["images/image_form_flow"],

  events: {
    "click #right-control": "nextForm",
    "click #left-control": "previousForm"
  },

  initialize: function (options) {
    this._images = options.newImages,
    this._modal = options.modal,
    this._index = 0;
    this.renderForms();
  },

  renderForms: function () {
    var that = this;
    this._images.each(function (image) {
      var imageForm = new GeoFlickr.Views.ImageForm({ model: image });
      that.addSubview("#image-form-container", imageForm);
    });
  },

  activateCurrentForm: function () {
    if (this._currentView) { this._currentView.deactivate() };
    this._currentView = this.subviews("#image-form-container")[this._index];
    this._currentView.activate();
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
    this._index = (this._index + 1) % this._images.length();
  },

  decrementIndex: function () {
    this._index = (this._index === 0) ? this._images.length() : this._index - 1;
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);

    return this;
  }
})
