Shelvesy::Application.routes.draw do
  root to: 'static_pages#root'

  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: { format: :json } do
    resources :books do
      get 'shelved', on: :collection
      get 'search', on: :collection
    end
    resources :shelves
    resources :shelved_books do
      get 'find', on: :collection
    end
    resources :reviews
  end
end
