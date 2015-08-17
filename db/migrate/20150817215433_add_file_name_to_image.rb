class AddFileNameToImage < ActiveRecord::Migration
  def change
    add_column :images, :file_name, :string
    change_column :images, :file_name, :string, index: true
  end
end
