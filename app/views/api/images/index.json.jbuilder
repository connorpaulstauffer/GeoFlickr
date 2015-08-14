json.array! @images do |image|
  json.(image, :id, :image, :user_id, :title, :latitude, :longitude, :address)
  json.image_thumb image.image.thumb 

  favorite = image.favorites.find_by(user_id: current_user.id)
  if favorite
    json.favorite do
      json.(favorite, :id)
    end
  end

  json.favorites_count image.favorites.count
end
