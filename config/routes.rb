Rails.application.routes.draw do
  root to: 'root#root'

  namespace :api, defaults: { format: :json } do
    get 'images/destroy_by_filenames', to: 'images#destroy_by_filenames'
    resources :users, only: [:create, :show]
    resources :sessions, only: [:create, :destroy]
    resources :images, only: [:create, :index, :update, :show]
    resources :favorites, only: [:create, :destroy]
    resources :tags, only: [:create, :index]
    resources :taggings, only: [:create, :destroy]
    resources :comments, only: [:create, :destroy]
  end

end
