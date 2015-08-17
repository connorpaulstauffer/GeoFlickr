GeoFlickr.Views.NavBar = Backbone.CompositeView.extend({
  template: JST["nav/navbar"],

  events: {
      'click #sign-up': 'openSignUpModal',
      'click #log-in': 'openLogInModal',
      'click #sign-out': 'signOut'
  },

  initialize: function (options) {
    this.currentUserId = (options.currentUser === "") ? null : options.currentUser;
  },

  openSignUpModal: function (event) {
    event.preventDefault();

    var signUpView = new GeoFlickr.Views.SignUp();
    var modal = new Backbone.BootstrapModal({
      content: signUpView,
      title: 'Sign Up',
      okText: 'Sign Up',
      focusOk: false,
      cancelText: false,
      enterTriggersOk: true,
      animate: true,
      okCloses: false
    }).open(this.signUpUser.bind(this, signUpView));
    this.activeModal = modal;
  },

  openLogInModal: function (event, parameters) {
    event.preventDefault();
    var logInView = new GeoFlickr.Views.LogIn({ parameters: parameters });
    var modal = new Backbone.BootstrapModal({
      content: logInView,
      title: 'Log In',
      okText: 'Log In',
      focusOk: false,
      cancelText: false,
      enterTriggersOk: true,
      animate: true,
      okCloses: false
    }).open(this.logInUser.bind(this, logInView, modal));
    this.activeModal = modal;
  },

  signUpUser: function (signUpView) {
    var userData = signUpView.$el.serializeJSON();

    if (userData.user['password'] !== userData.user['password-confirmation']) {
      var errors = ["Passwords do not match"];
      signUpView.addErrors(errors);
    } else {
      var newUser = new GeoFlickr.Models.User();
      delete userData['user']['password-confirmation'];

      newUser.save(userData, {
        success: function (user, response) {
          this.currentUserId = user.id;
          this.render();
          this.activeModal.close();
          this.activeModal = null;
        }.bind(this),

        error: function (model, resp) {
          signUpView.addErrors(resp.responseJSON)
        }
      })
    }
  },

  logInUser: function (logInView, modal) {
    var userData = logInView.$el.serializeJSON();
    var newSession = new GeoFlickr.Models.Session();

    newSession.save(userData, {
      success: function (user, response) {
        this.currentUserId = user.id
        this.render()
        this.activeModal.close();
        this.activeModal = null;
      }.bind(this),

      error: function (model, resp) {
        logInView.addErrors(resp.responseJSON)
      }
    })
  },

  signOut: function (event) {
    event.preventDefault();
    var dummySession = new GeoFlickr.Models.Session({ id: 0 });
    dummySession.destroy({
      success: function () {
        this.currentUserId = null;
        this.render();
      }.bind(this)
    })
  },

  render: function () {
    var content = this.template({
      currentUserId: this.currentUserId
    });
    this.$el.html(content);
    // this.attachSubviews();

    return this;
  }
});
