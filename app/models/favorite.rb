# == Schema Information
#
# Table name: favorites
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  image_id   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Favorite < ActiveRecord::Base
  belongs_to :user
  belongs_to :image
end
