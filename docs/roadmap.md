## Minimum Viable Product
GeoFlickr is a derivative of Flickr built with Rails and Backbone. Users can:

- [x] Create accounts
- [x] Create sessions (log in)
- [x] Upload images
- [x] Add images to albums
- [x] Tag images
- [x] View images at an index level
- [x] Search for images
- [x] Filter image results
- [x] View images at a show level
- [x] Favorite images


## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: views.md
[schema]: schema.md

## Implementation Timeline

### Phase 1: User Authentication (~1 day)
I will implement user authentication from scratch. Users will log in through
a Backbone Modal and gain access to image upload, comment, and favorite
features. I will also push the app to Heroku and register a domain name.

[Details][phase-one]

### Phase 2: Image Index (~2 days)
Images will be displayed in a grid alongside a map. Markers corresponding to
the coordinates of each image will render on the map. I will add filter forms
and a search bar that will eventually be used to filter results.

[Details][phase-two]

### Phase 3: Image Show (~2 days)
The image will be displayed at the top of the page. If the image is part of an
album it will be displayed as the active item in a carousel with the rest of
the album images. Data for view count, favorite count, and comments will be
shown below. A map with a marker at the location of the image's coordinates
will display in a sidebar. Tags, comments, and a form for adding a comment
will also appear.

[Details][phase-three]

### Phase 4: Uploading Images (~2 days)
Using the cloudinary gem, I will add an image upload page for registered
users. Users will drag and drop images onto the page to upload. The images
will be hosted by AWS. Images can be tagged and assigned to multiple albums.

[Details][phase-four]

### Phase 5: Searching for Images (~2 days)
Images on the index page can be filtered by tags, and by location using a
search bar or the map.

[Details][phase-five]

### Bonus Features (TBD)
- [x] Design improvements
- [ ] Image groups
- [ ] Image download
- [x] User show page
- [ ] Email authentication
- [ ] Omni-auth


[phase-one]: phases/phase1.md
[phase-two]: phases/phase2.md
[phase-three]: phases/phase3.md
[phase-four]: phases/phase4.md
[phase-five]: phases/phase5.md
