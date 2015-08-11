class CreateImages < ActiveRecord::Migration
  def change
    create_table :images do |t|
      t.string :image, null: false
      t.string :title
      t.text :description
      t.integer :latitude, index: true
      t.integer :longitude, index: true
      t.string :address

      t.timestamps null: false
    end
  end
end
