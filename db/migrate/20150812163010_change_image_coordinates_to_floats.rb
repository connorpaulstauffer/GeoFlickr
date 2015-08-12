class ChangeImageCoordinatesToFloats < ActiveRecord::Migration
  def change
    change_column :images, :latitude, :float
    change_column :images, :longitude, :float
  end
end
