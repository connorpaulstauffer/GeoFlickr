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
  has_many :favorites
  has_many :favoriters, through: :favorites, source: :user
  has_many :taggings
  has_many :tags, through: :taggings, source: :tag

  mount_uploader :image, ImageUploader

  geocoded_by :address
  reverse_geocoded_by :latitude, :longitude
  after_validation :geocode, if: ->(this){ !(this.latitude.present? && this.longitude.present?) }
  after_validation :reverse_geocode, if: ->(this){ !this.address.present? }

  def self.from_center(center, include_favorites = true)
    binds = {
      lat: center[0],
      lng: center[1],
      max_lat: center[0] + 50,
      min_lat: center[0] - 50,
      max_lng: center[1] + 50,
      min_lng: center[1] - 50
    }

    Image.includes(:favorites, :tags)
         .select("images.*, SQRT( POWER(#{binds[:lat]} - latitude, 2) + POWER(#{binds[:lng]} - longitude, 2) ) as distance_from_center")
         .where("latitude BETWEEN #{binds[:min_lat]} AND #{binds[:max_lat]} AND longitude BETWEEN #{binds[:min_lng]} AND #{binds[:max_lng]}")
         .order("distance_from_center")
         .limit(20)
  end
end
