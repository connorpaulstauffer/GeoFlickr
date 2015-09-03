GeoFlickr.Views.Loading = Backbone.View.extend({
  className: "loading",

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
    $( window ).on("scroll.loading", this.restrictScrolling.bind(this));
  },

  hide: function () {
    $(this.spinner).addClass("hidden");
    this.$el.addClass("hidden");
    $( window ).off("scroll.loading");
  },

  appendSpinner: function () {
    this.$el.append(this.spinner.el)
  },

  setDimensions: function (height, top) {
    this.scrollTop = $( window ).scrollTop();
    this.$el.css("top", top);
    this.$el.height(height);
  },

  restrictScrolling: function () {
    $( window ).scrollTop(this.scrollTop);
  },

  render: function () {
    return this;
  }
});
