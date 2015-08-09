class Api::SessionsController < ApplicationController
  # def new
  #   @user = User.new
  #   render :new
  # end

  def create
    these_params = user_params
    @user = User.find_by_credentials(these_params.email, these_params.password)
    if @user
      log_in_user!(@user)
      render json: @user
    else
      json_alert = 'Incorrect email/password combination'.to_json
      render json: json_alert, status: :unprocessable_entity
    end
  end

  def destroy
    token = params[:id]
    Session.find_by_token(token).destroy!
    session[:token] = nil;
    redirect_to root_url
  end
end
