# GeoFlickr

[![screenshot]][link]

[Live][link]

[Development Roadmap][roadmap]

[link]: http://geoflickr.me
[roadmap]: ./docs/roadmap.md
[screenshot]: ./docs/screenshots/geoflickr_screenshot.jpg

## Concept
GeoFlickr is a derivative of the professional photo-sharing application, [Flickr][flickr_link],
focused on geo-tagged images.

[flickr_link]: http://flickr.com

## Features
Users have the ability to
 * Authenticate
   * Sign up, log in, and log out through a secure authentication system
   * Sign in as a guest to experience all the features of the site without providing any personal information
 * Explore images
   * View stunning, high definition images in grid format, alongside a map displaying the location of each image
   * Filter images by location, geographical bounds, or tags
 * Interact with images
   * Hover over image and see its corresponding marker animate in the map
   * Favorite and unfavorite images directly from the index
   * Link to an image show page to see a larger version of the image along with more information and a form to leave comments
   * Visit a user's profile to see their images and favorited images
 * Upload their own images
   * Drag and drop or manually choose multiple image files to upload
   * Raise errors for invalid file types and continue uploading valid ones
   * Search on a map and drag a marker to assign the image's location
   * Apply tags and a description  

## Technologies
GeoFlickr is built on a Rails backend with a Postgres database and a Backbone.js front end.

The following Javascript/CSS libraries were used:
  * [Twitter Bootstrap][bootstrap]
  * [jQuery][jquery]
  * [jQuery Geocomplete][geocomplete]
  * [spin.js][spinner]
  * [jQuery file upload][jquery_file]

The [Google Maps Javascript API][google] was used for all the maps.

Please refer to the [Gemfile][gemfile] for a comprehensive list of gems used.

[bootstrap]: http://getbootstrap.com
[jquery]: http://jquery.com
[geocomplete]: http://ubilabs.github.io/geocomplete
[spinner]: http://fgnass.github.io/spin.js
[jquery_file]: http://github.com/blueimp/jQuery-File-Upload
[google]: http://developers.google.com/maps/documentation/javascript
[gemfile]: ./Gemfile


## TODO
- [ ] Refactor user images and favorites out of user show json response. Use nested rails resource with corresponding backbone collection instead.
- [ ] Ability for users to delete images and comments
- [ ] Image albums
- [ ] Image groups
- [ ] Image download
- [ ] Email authentication
- [ ] Omni-auth
