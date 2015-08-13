# == Schema Information
#
# Table name: images
#
#  id          :integer          not null, primary key
#  image       :string           not null
#  user_id     :integer          not null
#  album_id    :integer
#  title       :string
#  description :text
#  latitude    :float
#  longitude   :float
#  address     :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Image < ActiveRecord::Base
  validates :image, :user_id, presence: true

  belongs_to :user
  belongs_to :album

  mount_uploader :image, ImageUploader

  geocoded_by :address
  reverse_geocoded_by :latitude, :longitude
  after_validation :geocode, if: ->(this){ !(this.latitude.present? && this.longitude.present?) }
  after_validation :reverse_geocode, if: ->(this){ !this.address.present? }

  def self.from_center(center)
    binds = {
      max_lat: center[0] + 50,
      min_lat: center[0] - 50,
      max_lng: center[1] + 50,
      min_lng: center[1]
    }
    Image.where(<<-SQL, binds)
      image.latitude BETWEEN
    SQL
    self.where(latitude: (center[0] - 50)..(center[0] + 50))
        .where(longitude: (center[1] - 50)..(center[1] + 50))
        .order(
          "SQRT( SQUARE(latitude - ?) + SQUARE(longitude - ?) )",
          center[0],
          center[1]
         ).limit(20)
  end
end
