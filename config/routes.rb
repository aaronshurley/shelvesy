Shelvesy::Application.routes.draw do
  root to: 'static_pages#root'

  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: { format: :json } do
    resources :books, only: [:index, :show, :create]
    resources :shelves
    resources :shelved_books
    resources :reviews
    resources :comments
  end
end
