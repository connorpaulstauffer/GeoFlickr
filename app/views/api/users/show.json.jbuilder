json.(@user, :id, :email, :avatar, :banner)

json.images do
  json.array! @user.images
end

json.favorite_images do
  json.array! @user.favorite_images
end
