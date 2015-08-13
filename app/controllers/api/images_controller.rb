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
    if params[:filter_data]
      images = filter_images(params[:filter_data])
    else
      images = Image.all
    end
    render json: images
  end

  def update
    image = current_user.images.find(params[:id])
    if image.update(image_params)
      render json: image
    else
      render json: image.errors.full_messages, status: :unproccessable_entity
    end
  end

  private
  def filter_images(filter_data)
    center = Geocoder.coordinates(filter_data[:location])
    Image.from_center(center)
  end

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
