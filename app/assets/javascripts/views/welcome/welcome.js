GeoFlickr.Views.Welcome = Backbone.View.extend({
  template: JST["welcome/welcome"],

  className: "welcome-container",

  events: {
    "keydown #welcome-search": "handleSearchKeypress",
    "click #welcome-search-submit": "searchByLocation"
  },

  setHeight: function () {
    this.$el.height($( window ).height())
  },

  handleSearchKeypress: function (event) {
    if (event.which === 9) { event.preventDefault(); }
    if (event.which === 13) {
      // event.preventDefault();
      this.searchByLocation();
    }
  },

  searchByLocation: function () {
    event.preventDefault();
    var location = this.$("#welcome-search").val();
    if (location === "") {
      location = "San Francisco, CA"
    }
    Backbone.history.navigate("images/?location=" + location, { trigger: true });
  },

  attachGeocomplete: function () {
    this.$("#welcome-search").geocomplete();
  },

  activateHeader: function () {
    setTimeout(function () {
      this.animateHeader("Beautiful", function () {
        setTimeout(function () {
          this.clearHeader(function () {
            this.animateHeader("Awe Inspiring", function () {
              setTimeout(function () {
                this.clearHeader(function() {
                  this.animateHeader("Your")
                }.bind(this))
              }.bind(this), 2000)
            }.bind(this))
          }.bind(this));
        }.bind(this), 2000);
      }.bind(this))
    }.bind(this), 0);
  },

  animateHeader: function (text, callback) {
    var idx = 0;
    var $header = this.$("#header-adjective");

    var headerInterval = setInterval(function () {
      idx++;

      if (idx >= text.length) {
        clearInterval(headerInterval);
        if (callback) { callback(); }
      }

      $header.html(text.substr(0, idx));
    }.bind(this), 250)
  },

  clearHeader: function (callback) {
    var $header = this.$("#header-adjective");

    var headerInterval = setInterval(function () {
      var headerVal = $header.text()
      $header.text(headerVal.slice(0, -1));

      if ($header.text().length === 0) {
        clearInterval(headerInterval);
        if (callback) { callback(); }
      }
    }.bind(this), 100)
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.setHeight();
    this.attachGeocomplete();
    this.activateHeader();

    return this;
  }
});
