GeoFlickr.Views.Root = Backbone.View.extend({
    el: 'body',

    events: {
        'click #sign-up': 'openSignUpModal',
        'click #log-in': 'openLogInModal'
    },

    openSignUpModal: function () {
        var signUpView = new GeoFlickr.Views.SignUp();
        var modal = new Backbone.BootstrapModal({
            content: signUpView,
            title: 'Sign Up',
            okText: 'Sign Up',
            enterTriggersOk: true,
            animate: true
        }).open(this.signUpUser.bind(this, signUpView));
    },

    openLogInModal: function () {
      var logInView = new GeoFlickr.Views.LogIn();
      var modal = new Backbone.BootstrapModal({
          content: logInView,
          title: 'Log In',
          okText: 'Log In',
          enterTriggersOk: true,
          animate: true
      }).open(this.logInUser.bind(this, logInView));
    },

    signUpUser: function (signUpView) {
      $.ajax({
        url: '/api/users',
        type: 'POST',
        data: signUpView.$el.serializeJSON(),
        success: function () {
          window.location.reload(true);
        }
      });
    },

    logInUser: function (logInView) {
      $.ajax({
        url: '/api/sessions',
        type: 'POST',
        data: logInView.$el.serializeJSON(),
        success: function () {
          window.location.reload(true);
        }
      });
    }
});
