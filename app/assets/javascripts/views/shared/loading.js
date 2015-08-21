GeoFlickr.Views.Loading = Backbone.View.extend({
  className: "loading",

  // template: JST["shared/loading"],

  initialize: function () {
    var opts = {
      lines: 13,
      length: 28,
      width: 14,
      radius: 42,
      scale: 1,
      corners: 1,
      color: '#000',
      opacity: 0.25,
      rotate: 0,
      direction: 1,
      speed: 1,
      trail: 60,
      fps: 20,
      zIndex: 2e9,
      className: 'spinner',
      top: '50%',
      left: '50%',
      shadow: false,
      hwaccel: false,
      position: 'absolute'
    }
    this.spinner = new Spinner(opts).spin();
    this.hide();
  },

  show: function () {
    this.$el.removeClass("hidden");
    $(this.spinner).removeClass("hidden");
  },

  hide: function () {
    $(this.spinner).addClass("hidden");
    this.$el.addClass("hidden");
  },

  appendSpinner: function () {
    this.$el.append(this.spinner.el)
  },

  setHeight: function (height) {
    this.$el.height(height)
  },

  render: function () {
    // var content = this.template();
    // this.$el.html(content);

    return this;
  }
});
