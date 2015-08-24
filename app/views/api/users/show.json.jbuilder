json.(@user, :id, :email, :name, :avatar, :banner)

json.images do
  json.array! @user.images do |this_image|
    json.partial! "api/images/image", image: this_image
  end
end

json.favorite_images do
  json.array! @user.favorite_images do |this_image|
    json.partial! "api/images/image", image: this_image
  end
end
