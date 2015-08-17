json.partial! "api/images/image", image: @image

json.user @image.user

json.user_images do
  json.array! @image.user.images
end

json.favorites_count @image.favorites.count

json.tags do
  json.array! @image.tags
end
