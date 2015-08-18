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

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.setHeight();
    this.attachGeocomplete();

    return this;
  }
});
