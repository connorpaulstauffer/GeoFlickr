require 'open-uri'

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

  def log_out!
    @current_user = nil
    session_token = session[:session_token]
    Session.find_by_session_token(session_token).destroy!
    session[:session_token] = nil;
  end

  def user_params
    params.require(:user).permit(:email, :password, :name)
  end

  def raise_current_user_error
    render json: ["You must be logged in to do that"].to_json, status: :unproccessable_entity
  end

  def file_from_url(url)
    extname = File.extname(url)
    basename = File.basename(url, extname)
    file = Tempfile.new([basename, extname])
    file.binmode

    open(url) do |data|
      file.write data.read
    end

    file.rewind
    file
  end

  def create_demo_user(email, password)
    user = User.new(
      name: "Demo User",
      email: email,
      password: password,
      avatar: File.open("app/assets/images/avatar.png"),
      banner: File.open("app/assets/images/user_banner.jpg")
    )

    user.save
    user
  end
end
