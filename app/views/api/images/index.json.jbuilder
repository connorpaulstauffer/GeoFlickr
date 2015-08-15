json.images do
  json.array! @images do |this_image|

    json.(this_image, :id, :image, :user_id, :title, :latitude, :longitude, :address)

    if current_user
      favorite = this_image.favorites.find_by(user_id: current_user.id)
      if favorite
        json.favorite do
          json.(favorite, :id)
        end
      end
    end

    json.favorites_count this_image.favorites.count
  end
end

json.center @center

json.tags do
  json.array! @tags
end
