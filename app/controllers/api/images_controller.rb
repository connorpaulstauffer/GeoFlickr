class Api::ImagesController < ApplicationController
  def create
    image = current_user.images.new(image_params)
    image.file_name = image.image.file.filename
    if image.save
      render json: image
    else
      render json: image.errors.full_messages, status: :unproccessable_entity
    end
  end

  def show
    @image = Image.includes(
      :favorites,
      :tags,
      comments: :user,
      user: :images
    ).find(params[:id])

    render 'show'
  end

  def index
    if params[:filter_data]
      if params[:filter_data][:location]
        center = Geocoder.coordinates(params[:filter_data][:location])
        @images = Image.from_center(center)
        @center = center.to_json
      else
        tag = params[:filter_data][:tag]
        bounds = params[:filter_data][:bounds] || {
          'lng' => ['-165.0', '-50.0'],
          'lat' => ['0.0', '80.0']
        }
        @images = Image.from_bounds(bounds, tag)
      end
    else
      bounds = {
        'lng' => ['-165.0', '-50.0'],
        'lat' => ['0.0', '80.0']
      }
      @images = Image.from_bounds(bounds, nil)
      # @center = [37.78, -122.41].to_json
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

  def destroy_by_filenames
    params[:file_names].try(:each) do |file_name|
      image = Image.find_by(file_name: file_name)
      image.destroy if image
    end

    render json: params[:file_names].to_json
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
