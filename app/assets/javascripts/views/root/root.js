GeoFlickr.Views.Root = Backbone.View.extend({
    el: 'body',

    events: {
        'click #sign-up': 'openSignUpModal',
        'click #log-in': 'openLogInModal'
    },

    openSignUpModal: function (event) {
        event.preventDefault();
        var signUpView = new GeoFlickr.Views.SignUp();
        var modal = new Backbone.BootstrapModal({
            content: signUpView,
            title: 'Sign Up',
            okText: 'Sign Up',
            enterTriggersOk: true,
            animate: true,
            okCloses: false
        }).open(this.signUpUser.bind(this, signUpView));
    },

    openLogInModal: function () {
      event.preventDefault();
      var logInView = new GeoFlickr.Views.LogIn();
      var modal = new Backbone.BootstrapModal({
          content: logInView,
          title: 'Log In',
          okText: 'Log In',
          enterTriggersOk: true,
          animate: true,
          okCloses: false
      }).open(this.logInUser.bind(this, logInView));
    },

    signUpUser: function (signUpView) {
      var userData = signUpView.$el.serializeJSON();
      if (userData.user['password'] !== userData.user['password-confirmation']) {
        var errors = ["Passwords do not match"];
        signUpView.addErrors(errors);
      } else {
        $.ajax({
          url: '/api/users',
          type: 'POST',
          data: userData,

          success: function () {
            window.location.reload(true);
          },

          error: function (xhr) {
            signUpView.addErrors(xhr.responseJSON)
          }
        });
      }
    },

    logInUser: function (logInView) {
      $.ajax({
        url: '/api/sessions',
        type: 'POST',
        data: logInView.$el.serializeJSON(),

        success: function () {
          window.location.reload(true);
        },

        error: function (xhr) {
          logInView.addErrors(xhr.responseJSON)
        }
      });
    }
});
