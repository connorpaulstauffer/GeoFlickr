GeoFlickr.Views.ImageForm = Backbone.CompositeView.extend({
  template: JST["images/image_form"],

  events: {
    "keypress #search-input": "handleSearchKeypress",
    "keypress #tag-input": "handleTagKeypress"
  },

  initialize: function (options) {
    if (options.hidden) { this.$el.css("display", "none"); }

    this._tags = options.tags
    this._tags.each(this.addTagCheckbox.bind(this));
    this.listenTo(this._tags, "add", this.addTagCheckbox.bind(this));
    // this.listenTo(this.model.tags(), "add", this.addTagCheckbox.bind(this));
  },

  addTagCheckbox: function (tag) {
    var tagCheckbox = new GeoFlickr.Views.TagCheckbox({
      model: tag,
      image: this.model
    });
    this.addSubview("#tag-checkboxes", tagCheckbox, true);
  },

  addMap: function () {
    if (this._map) { return; }
    this.imageFormMap = new GeoFlickr.Views.ImageFormMap({
      $searchBar: this.$("#search-input")
    });
    this.$("#image-form-map").html(this.imageFormMap.$el);
    this.imageFormMap.initializeMap();
  },

  handleSearchKeypress: function (event) {
    if (event.which === 13) {
      this.searchOnMap($(event.currentTarget).val());
    }
  },

  handleTagKeypress: function (event) {
    if (event.which === 13) {
      event.preventDefault();
      var label = $(event.currentTarget).val();
      var tag = this._tags.where({ label: label })[0]
      if (!tag) {
        tag = new GeoFlickr.Models.Tag({ label: label })
        tag.save();
        this._tags.add(tag)
      }
      this.model.tags().add(tag);
      this.$("#tag-input").val("");
    }
  },

  searchOnMap: function (input) {
    event.preventDefault();
    var that = this;
    this.imageFormMap._geocoder.geocode( { 'address': input}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        that.imageFormMap._map.setCenter(results[0].geometry.location);
        that._marker = new google.maps.Marker({
            map: that.imageFormMap._map,
            position: results[0].geometry.location,
            draggable: true
        });
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  },

  activate: function () {
    this.$el.removeAttr("style");
  },

  deactivate: function () {
    this.$el.css("display", "none");
  },

  render: function () {
    var content = this.template({
      image: this.model,
      tags: this._tags
    });
    this.$el.html(content);
    this.attachSubviews();

    return this;
  }

  // onRender: function () {
  //   this.addMap();
  // }
});
