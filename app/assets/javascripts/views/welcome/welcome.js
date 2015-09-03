GeoFlickr.Views.Welcome = Backbone.View.extend({
  template: JST["welcome/welcome"],

  className: "welcome-container",

  events: {
    "keydown #welcome-search": "handleSearchKeypress",
    "click #welcome-search-submit": "searchByLocation"
  },

  setDimensions: function () {
    var windowHeight = $( window ).height()
    var windowWidth = $( window ).width()
    var windowRatio = windowHeight / windowWidth;
    this.$el.height(windowHeight);
    // precalculated for speed
    var imageRatio = .6666666;
    var $img = this.$("img");
    if (imageRatio > windowRatio) {
      $img.width(windowWidth)
    } else {
      $img.height(windowHeight)
    }
    $img.removeClass("hidden");
  },

  handleSearchKeypress: function (event) {
    if (event.which === 9) { event.preventDefault(); }
    if (event.which === 13) {
      this.searchByLocation();
    }
  },

  searchByLocation: function () {
    event.preventDefault();
    var location = this.$("#welcome-search").val();
    if (location === "") {
      Backbone.history.navigate("images", { trigger: true });
    } else {
      Backbone.history.navigate("images/?location=" + location, { trigger: true });
    }
  },

  attachGeocomplete: function () {
    this.$("#welcome-search").geocomplete();
  },

  activateHeader: function () {
    this.blinkCursor();
    setTimeout(function () {
      this.stopBlinkingCursor();
      this.animateHeader("Geotagged", function () {
        this.blinkCursor();
        setTimeout(function () {
          this.stopBlinkingCursor();
          this.clearHeader(function () {
            this.animateHeader("Stunning", function () {
              this.blinkCursor();
              setTimeout(function () {
                this.stopBlinkingCursor();
                this.clearHeader(function() {
                  this.animateHeader("Your", function () {
                    this.blinkCursor();
                    setTimeout(function() {
                      this.stopBlinkingCursor();
                      this.$("#header-cursor").css("visibility", "hidden");
                    }.bind(this), 3000)
                  }.bind(this));
                }.bind(this));
              }.bind(this), 3000)
            }.bind(this));
          }.bind(this));
        }.bind(this), 3000);
      }.bind(this));
    }.bind(this), 1000);
  },

  blinkCursor: function () {
    this.$("#header-cursor").addClass("blink");
  },

  stopBlinkingCursor: function () {
    this.$("#header-cursor").removeClass("blink");
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
    }.bind(this), 175)
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
    this.setDimensions();
    $( window ).on("resize", this.setDimensions.bind(this));
    this.attachGeocomplete();
    this.$el.imagesLoaded(function () {
      this.activateHeader();
    }.bind(this));

    return this;
  },

  remove: function () {
    $( window ).off("resize", this.setDimensions);
    Backbone.View.prototype.remove.apply(this, arguments);
  }
});
