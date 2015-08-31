class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    @user.avatar = file_from_url(Faker::Avatar.image)
    @user.banner = file_from_url(
      "https://c4.staticflickr.com/4/3904/15307929495_c605555414_h.jpg"
    )

    if @user.save
      log_in_user!(@user)
      render json: @user
    else
      errors = @user.errors.full_messages.to_json
      render json: errors, status: :unprocessable_entity
    end
  end

  def show
    @user = User.includes(:favorite_images, :images).find(params[:id])
    render 'show'
  end

  def favorite_images
    user = User.find(params[:id])
    @images = user.favorite_images
    @no_pages = true
    render 'api/images/index'
  end

  def images
    user = User.find(params[:id])
    @images = user.images
    @no_pages = true
    render 'api/images/index'
  end
end
