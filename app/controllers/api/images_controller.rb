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
      center = Geocoder.coordinates(params[:filter_data][:location])
      # byebug
      @images = filter_images(center)
      @center = center.to_json
    else
      @images = Image.from_center([37.78, -122.41])
      @center = [37.78, -122.41].to_json
    end
    ActiveRecord::Associations::Preloader.new.preload(@images, [:favorites])
    render :index
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
  def filter_images(center)
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
      :address,
      tag_ids: []
    )
  end
end
