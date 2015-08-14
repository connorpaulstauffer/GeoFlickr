class Api::FavoritesController < ApplicationController
  def create
    raise_current_user_error && return unless current_user
    
    favorite = current_user.favorites.new(favorite_params)

    if favorite.save
      render json: favorite
    else
      render json: favorite.errors.full_messages, status: :unproccessable_entity
    end
  end

  def destroy
    favorite = Favorite.find(params[:id])
    favorite.destroy
    render json: favorite
  end

  private
  def favorite_params
    params.require(:favorite).permit(:image_id)
  end
end
