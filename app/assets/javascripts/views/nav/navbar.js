GeoFlickr.Views.NavBar = Backbone.CompositeView.extend({
  template: JST["nav/navbar"],

  events: {
      'click .navbar-brand': "goToIndex",
      'click #sign-up': 'openSignUpModal',
      'click #log-in': 'openLogInModal',
      'click #sign-out': 'signOut',
      "click #search-icon": "handleSearchButton",
      "keydown #search-input": "handleSearchKeypress"
  },

  initialize: function (options) {
    this.router = options.router;
  },

  goToIndex: function () {
    Backbone.history.navigate("images", { trigger: true });
  },

  openSignUpModal: function (event) {
    this.activeModalView && this.activeModalView.remove();
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

    this.activeModalView = signUpView;
    this.activeModal = modal;
  },

  openLogInModal: function (event, parameters) {
    this.activeModalView && this.activeModalView.remove();
    var logInView = new GeoFlickr.Views.LogIn({ parameters: parameters });
    var modal = new Backbone.BootstrapModal({
      content: logInView,
      title: 'Log In',
      okText: 'Log In',
      focusOk: false,
      cancelText: false,
      enterTriggersOk: true,
      animate: true,
      okCloses: false,
      offerSignUp: true,
      offerGuestLogin: true
    }).open(this.logInUser.bind(this, logInView, modal));
    this.activeModal = modal;
    this.activeModalView = logInView;

    this.activeModal.bind("shown", function () {
      this.addGuestLogin();
      this.addSignUpOption();
      this.activeModalView.addLoading();
    }.bind(this));
  },

  addSignUpOption: function () {
    $("#sign-up-option-link").on("click", this.switchToSignUp.bind(this));
  },

  addGuestLogin: function () {
    $("#guest-login").on("click", this.loginAsGuest.bind(this));
  },

  loginAsGuest: function () {
    var code = "";
    for (var i = 0; i < 10; i++) {
      code += Math.floor(Math.random() * 10)
    }
    var email = code + "@geoflickrdemo.com";
    var password = code;

    setTimeout(function () {
      this.animateInput("#user-email", email, function () {
        this.animateInput("#user-password", password, function () {
          $(".ok").trigger("click");
        }.bind(this));
      }.bind(this));
    }.bind(this), 0);
  },

  animateInput: function (selector, text, success) {
    var _index = 0;
    var textInterval = setInterval(function () {
      var $el = $(selector);
      var currentVal = $el.val();
      _index++;
      $el.val(text.substr(0, _index));
      if (_index >= text.length) {
        clearInterval(textInterval);
        success();
      }
    }.bind(this), 50);
  },

  switchToSignUp: function () {
    this.activeModal.close();
    this.openSignUpModal();
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
          currentUser = new GeoFlickr.Models.User({
            id: user.id
          })
          currentUser.fetch();
          // this.render();
          this.activeModal && this.activeModal.close();
          this.activeModal = null;
          // Backbone.history.navigate("/images", { trigger: true });
          window.location.reload(true)
        }.bind(this),

        error: function (model, resp) {
          signUpView.addErrors(resp.responseJSON)
        }
      })
    }
  },

  logInUser: function (logInView, modal) {
    this.activeModalView.showLoading()
    var userData = logInView.$el.serializeJSON();
    var newSession = new GeoFlickr.Models.Session();

    newSession.save(userData, {
      success: function (user, response) {
        // global
        currentUser = new GeoFlickr.Models.User({
          id: user.id
        })
        currentUser.fetch();
        // this.render()
        this.activeModalView.hideLoading();
        this.activeModal && this.activeModal.close();
        this.activeModal = null;
        // Backbone.history.navigate("/images", { trigger: true });
        window.location.reload(true)
      }.bind(this),

      error: function (model, resp) {
        logInView.addErrors(resp.responseJSON)
      }
    })
  },

  signOut: function (event) {
    var dummySession = new GeoFlickr.Models.Session({ id: 0 });
    dummySession.destroy({
      success: function () {
        currentUser = null;
        this.render();
        setTimeout(function () {
          window.location.reload(true);
        }, 1);
      }.bind(this)
    })
  },

  attachGeocomplete: function () {
    this.$("#search-input").geocomplete();
  },

  handleSearchButton: function () {
    var location = this.$("#search-input").val();
    this.searchByLocation(location);
  },

  searchByLocation: function (location) {
    if (location === "") {
      alert("Invalid location. Please try again.");
    } else {
      Backbone.history.navigate("images/?location=" + location, { trigger: true });
    }
  },

  handleSearchKeypress: function (event) {
    if (event.which === 9) { event.preventDefault(); }
    if (event.which === 13) {
      var location = $(event.target).val();
      this.searchByLocation(location);
    }
  },

  addCurrentUserAvatar: function () {
    if (currentUser.get("avatar")) {
      this.$("#current-user-avatar").attr(
        "src",
        currentUser.get("avatar").avatar.micro.url
      );
      this.$("#current-user-name").html(currentUser.get("name") + " ");
      $caret = $("<span>");
      $caret.addClass("caret");
      this.$("#current-user-name").append($caret);
    } else {
      this.listenToOnce(currentUser, "sync", this.addCurrentUserAvatar);
    }
  },

  render: function () {
    var content = this.template({
      currentUser: currentUser
    });
    this.$el.html(content);
    this.attachGeocomplete();
    if (currentUser) { this.addCurrentUserAvatar(); }

    return this;
  }
});
