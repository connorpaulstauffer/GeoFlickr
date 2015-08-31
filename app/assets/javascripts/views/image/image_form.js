GeoFlickr.Views.ImageForm = Backbone.CompositeView.extend({
  template: JST["images/image_form"],

  events: {
    "keydown #form-search-input": "handleSearchKeypress",
    "keypress #tag-input": "handleTagKeypress",
    "click .search-glyph": "searchClick"
  },

  initialize: function (options) {
    this.$el.css("display", "none");

    this._tags = options.tags
    this._tags.each(this.addTagCheckbox.bind(this));
    this.listenTo(this._tags, "add", this.addTagCheckbox.bind(this));
  },

  display: function () {
    this.$el.removeAttr("style");
  },

  hide: function () {
    this.$el.css("display", "none");
  },

  addTagCheckbox: function (tag) {
    var tagCheckbox = new GeoFlickr.Views.TagCheckbox({
      model: tag,
      image: this.model
    });
    this.addSubview("#tag-checkboxes", tagCheckbox, true);
  },

  addMap: function () {
    if (this.imageFormMap) {
      if (this._marker) {
        var bounds = new google.maps.LatLngBounds(this._marker.position);
        this.imageFormMap._map.fitBounds(bounds);
      }
      return;
    }
    this.imageFormMap = new GeoFlickr.Views.ImageFormMap({
      $searchBar: this.$("#search-input")
    });
    this.$("#image-form-map").html(this.imageFormMap.$el);
    this.imageFormMap.initializeMap();
  },

  handleSearchKeypress: function (event) {
    if (event.which === 13) {
      event.preventDefault();
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

  searchClick: function () {
    this.searchOnMap(this.$("#form-search-input").val());
  },

  activate: function () {
    this.$el.removeAttr("style");
  },

  deactivate: function () {
    this.$el.css("display", "none");
  },

  attachGeocomplete: function () {
    this.$("#form-search-input").geocomplete();
  },

  render: function () {
    var content = this.template({
      image: this.model,
      tags: this._tags
    });
    this.$el.html(content);
    this.attachSubviews();
    this.attachGeocomplete();

    return this;
  }
});
