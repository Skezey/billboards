Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'
  get 'api/artists', to: 'api/artists#top_artist_index'
  namespace :api do
    resources :playlists

    resources :genres do
      resources :artists
      resources :genre_playlists
    end

    resources :artists do
      resources :songs
    end

    resources :events

    resources :forums do
      resources :posts
    end

    resources :users do
      resources :posts
    end
  end

  get '*other', to: 'static#index'
end
