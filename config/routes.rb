Rails.application.routes.draw do
  root to: 'root#root'

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create]
    resources :sessions, only: [:create, :destroy]
    resources :images, only: [:create, :index]
  end
end
