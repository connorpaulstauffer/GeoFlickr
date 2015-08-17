class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    if @user.save
      log_in_user!(@user)
      render json: @user
    else
      errors = @user.errors.full_messages.to_json
      render json: errors, status: :unprocessable_entity
    end
  end

  def show
    @user = User.includes(:favorite_images, :images).find(params[:id])
    render 'show'
  end
end
