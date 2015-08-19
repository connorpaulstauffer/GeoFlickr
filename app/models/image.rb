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
#  file_name   :string
#

class Image < ActiveRecord::Base
  validates :image, :user_id, presence: true

  belongs_to :user
  belongs_to :album
  has_many :favorites
  has_many :favoriters, through: :favorites, source: :user
  has_many :taggings
  has_many :tags, through: :taggings, source: :tag
  has_many :comments

  mount_uploader :image, ImageUploader

  geocoded_by :address
  reverse_geocoded_by :latitude, :longitude
  after_validation :geocode, if: ->(this){ !(this.latitude.present? && this.longitude.present?) }
  after_validation :reverse_geocode, if: ->(this){ !this.address.present? }

  def self.from_center(center)
    binds = {
      lat: center[0],
      lng: center[1],
      max_lat: center[0] + 20,
      min_lat: center[0] - 20,
      max_lng: center[1] + 20,
      min_lng: center[1] - 20
    }

    Image.includes(:favorites, :tags)
         .select("images.*, SQRT( POWER(#{binds[:lat]} - latitude, 2) + POWER(#{binds[:lng]} - longitude, 2) ) as distance_from_center")
         .where("latitude BETWEEN #{binds[:min_lat]} AND #{binds[:max_lat]} AND longitude BETWEEN #{binds[:min_lng]} AND #{binds[:max_lng]}")
         .order("distance_from_center")
         .limit(50)
  end

  def self.from_bounds(filter_data, tags)
    binds = {
      :lat_min => filter_data['lat'][0],
      :lat_max => filter_data['lat'][1],
      :lng_min => filter_data['lng'][0],
      :lng_max => filter_data['lng'][1]
    }

    if binds[:lng_min].to_f > binds[:lng_max].to_f
      # Wrap around the International Date Line
      images = Image.includes(:tags, :favorites).where(<<-SQL, binds)
        (images.longitude BETWEEN :lng_min AND 180
          OR images.longitude BETWEEN -180 AND :lng_max)
        AND images.latitude BETWEEN :lat_min AND :lat_max
      SQL
    else
      images = Image.includes(:tags, :favorites).where(<<-SQL, binds)
        images.latitude BETWEEN :lat_min AND :lat_max
          AND images.longitude BETWEEN :lng_min AND :lng_max
      SQL
    end

    images = images.joins(:tags).where("tags.id IN #{"(" + tags.join(",") + ")"}") if tags
    images
  end
end
