class CreateFavorites < ActiveRecord::Migration
  def change
    create_table :favorites do |t|
      t.integer :user_id, null: false, index: true
      t.integer :image_id, null: false, index: true

      t.timestamps null: false
    end
  end
end
