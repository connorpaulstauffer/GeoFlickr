class ImageUploader < CarrierWave::Uploader::Base
  include CarrierWave::RMagick

  if Rails.env.production?
    storage :fog
  else
    storage :file
  end

  version :thumb do
    process resize_to_limit: [400, 400]
    process quality: 400
  end

  version :micro do
    process resize_to_limit: [200, 200]
    process quality: 200
  end

  version :macro do
    process resize_to_limit: [600, 600]
    process quality: 600
  end

  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end
end
