GeoFlickr.Views.SignUp = Backbone.CompositeView.extend({
  tagName: 'form',

  template: JST['root/sign_up'],

  events: {
    "blur #user-password": "validatePasswordLength",
    "keyup #user-password": "validatePasswordLength"
  },

  addErrors: function (errors) {
    this.removeErrors();

    errors.forEach(function (error) {
      var errorView = new GeoFlickr.Views.Error({ error: error });
      this.addSubview('.errors', errorView);
    }.bind(this))
  },

  removeErrors: function () {
    this.eachSubview(function (subview, selector) {
      this.removeSubview(selector, subview);
    }.bind(this))
  },

  validatePasswordLength: function (event) {
    var $passwordField = $(event.currentTarget);

    if ($passwordField.parent().hasClass("has-error")) {
      if ($passwordField.val().length >= 6) {
        this.removeInputError($passwordField);
        this.addInputConfirmation($passwordField);
      }
    } else if (event.type === "keyup") {
      return
    } else if ($passwordField.val().length < 6) {
      this.removeInputConfirmation($passwordField);
      this.addInputError.call(this, $passwordField, "Password must be at least 6 characters");
    } else {
      this.addInputConfirmation($passwordField);
    }
  },

  addInputError: function (field, message) {
    field.parent().addClass("has-error has-feedback");
    field.parent().append($('<span class="error glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>'));
    field.parent().append($('<span id="input-error" class="error sr-only">(error)</span>'));
    field.parent().append($('<label class="error control-label" for="input-error">' + message + '</label>'));
    field.attr("aria-describedby", "input-error");
  },

  addInputConfirmation: function (field) {
    field.parent().addClass("has-success has-feedback");
    field.parent().append($('<span class="success glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>'));
    field.parent().append($('<span id="input-success" class="success sr-only">(success)>(error)</span>'));
    field.attr("aria-describedby", "input-success");
  },

  removeInputError: function (field) {
    field.parent().removeClass("has-error has-feedback");
    field.parent().find(".error").remove();
    field.removeAttr("aria-describedby");
  },

  removeInputConfirmation: function (field) {
    field.parent().removeClass("has-success has-feedback");
    field.parent().find(".success").remove();
    field.removeAttr("aria-describedby");
  },

  render: function () {
    var content = this.template({ errors: this.errors });
    this.$el.html(content);

    return this;
  }
});
