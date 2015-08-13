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
      lat: center[0],
      lng: center[1],
      max_lat: center[0] + 50,
      min_lat: center[0] - 50,
      max_lng: center[1] + 50,
      min_lng: center[1] - 50
    }
    Image.find_by_sql([
      "SELECT
        *, SQRT( POWER(? - latitude, 2) + POWER(? - longitude, 2) ) as distance_from_center
      FROM
        images
      WHERE
        latitude BETWEEN ? AND ?
          AND longitude BETWEEN ? AND ?
      ORDER BY
        distance_from_center
      LIMIT
        20", binds[:lat], binds[:lng], binds[:min_lat], binds[:max_lat], binds[:min_lng], binds[:max_lng]])
    # # Image.select("*, SQRT( SQUARE(? - images.latitude) + SQUARE(? - images.longitude) ) as distance_from_center", :lat, :lng)
    #   .where(<<-SQL, binds)
    #   images.latitude BETWEEN :min_lat AND :max_lat
    #     AND images.longitude BETWEEN :min_lng AND :max_lng
    #   ORDER BY
    #     images.distance_from_center
    #   LIMIT 20
    # SQL
  end
end
