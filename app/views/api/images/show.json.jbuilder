json.(@image, :id, :image, :title, :latitude, :longitude, :address)

if current_user
  favorite = @image.favorites.find_by(user_id: current_user.id)
  if favorite
    json.favorite do
      json.(favorite, :id)
    end
  end
end

json.user @image.user

json.user_images do
  json.array! @image.user.images
end

json.favorites_count @image.favorites.count

json.tags do
  json.array! @image.tags
end
