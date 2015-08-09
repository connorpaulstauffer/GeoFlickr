# GeoFlickr

[GeoFlickr][link]

[link]: http://herokuapp.geoflickr.com

## Minimum Viable Product
GeoFlickr is a derivative of Flickr built with Rails and Backbone. Users can:

- [ ] Create accounts
- [ ] Create sessions (log in)
- [ ] Upload images
- [ ] Add images to albums
- [ ] Tag images
- [ ] View images at an index level
- [ ] Search for images
- [ ] Filter image results
- [ ] View images at a show level
- [ ] Favorite images


## Design Docs
* [DB schema][schema]

[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication (~1 day)
I will implement user authentication from scratch. Users will log in through
a Backbone Modal and gain access to image upload, comment, and favorite
features. I will also push the app to Heroku and register a domain name.

<!-- [Details][phase-one] -->

### Phase 2: Uploading Images (~2 days)
Using the filepicker-rails gem, I will add an image upload page for registered
users. Users will drag and drop images onto the page to upload and the images
will be hosted by AWS. Images can be tagged and assigned to multiple albums.

<!-- [Details][phase-two] -->

### Phase 3: Image Index (~2 days)
Images will be displayed in a grid alongside a map. Markers corresponding to
the coordinates of each image will render on the map. I will add filter forms
and a search bar that will eventually be used to filter results.

<!-- [Details][phase-three] -->

### Phase 4: Image Show (~2 days)
The image will be displayed at the top of the page. If the image is part of an
album it will be displayed as the active item in a carousel with the rest of
the album images. Data for view count, favorite count, and comments will be
shown below. A map with a marker at the location of the image's coordinates
will display in a sidebar. Tags, comments, and a form for adding a comment
will also appear.

<!-- [Details][phase-four] -->

### Phase 5: Searching for Images (~1 days)
Images on the index page can be filtered by tags, and by location using a
search bar or the map.


<!-- [Details][phase-five] -->

### Bonus Features (TBD)
- [ ] Image groups
- [ ] Image download
- [ ] User show page
- [ ] Email authentication
- [ ] Google authentication


<!-- [phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md -->
