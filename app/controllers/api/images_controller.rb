class Api::ImagesController < ApplicationController
  def create
    image = current_user.images.new(image_params)
    if image.save
      render json: image
    else
      render json: image.errors.full_messages, status: :unproccessable_entity
    end
  end

  def index
    images = Image.all
    render json: images
  end

  private
  def image_params
    params.require(:image).permit(
      :image,
      :user_id,
      :album_id,
      :title,
      :description,
      :latitude,
      :longitude,
      :address
    )
  end
end
