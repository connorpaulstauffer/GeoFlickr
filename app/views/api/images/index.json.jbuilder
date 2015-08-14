json.images do
  json.array! @images do |image|
    json.(image, :id, :image, :user_id, :title, :latitude, :longitude, :address)
    json.image_thumb image.image.thumb

    if current_user
      favorite = image.favorites.find_by(user_id: current_user.id)
      if favorite
        json.favorite do
          json.(favorite, :id)
        end
      end
    end

    # json.tags do
    #   json.array! image.tags do |tag|
    #     json.(tag, :id, :label)
    #   end
    # end

    json.favorites_count image.favorites.count
  end
end

json.center @center
