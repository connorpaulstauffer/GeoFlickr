class AddAvatarAndBannerToUsers < ActiveRecord::Migration
  def change
    add_column :users, :avatar, :string
    add_column :users, :banner, :string
  end
end
