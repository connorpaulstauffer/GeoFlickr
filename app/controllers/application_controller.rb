class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  helper_method :current_user, :logged_in?

  def current_user
    @current_user ||= User.find_by_session_token(session[:session_token])
  end

  def logged_in?
    !!current_user
  end

  def log_in_user!(user)
    token = Session.generate_session_token
    user.sessions.create!(session_token: token)
    session[:session_token] = token
  end

  def user_params
    params.require(:user).permit(:email, :password)
  end

  def raise_current_user_error
    render json: ["You must be logged in to do that"].to_json, status: :unproccessable_entity
  end
end
