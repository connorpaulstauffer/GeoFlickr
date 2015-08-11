class CreateImages < ActiveRecord::Migration
  def change
    create_table :images do |t|
      t.string :image, null: false
      t.integer :user_id, null: false, index: true
      t.integer :album_id, index: true
      t.string :title
      t.text :description
      t.integer :latitude, index: true
      t.integer :longitude, index: true
      t.string :address

      t.timestamps null: false
    end
  end
end
