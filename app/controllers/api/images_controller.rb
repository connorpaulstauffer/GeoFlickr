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
      if params[:filter_data][:location]
        center = Geocoder.coordinates(params[:filter_data][:location])
        @images = Image.from_center(center)
        @center = center.to_json
      else
        @images = Image.from_bounds(params[:filter_data])
      end
    else
      @images = Image.from_center([37.78, -122.41])
      @center = [37.78, -122.41].to_json
    end
    @tags = @images.map(&:tags).flatten.uniq
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
