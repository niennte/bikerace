Rails.application.routes.draw do
  resources :riders
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root 'site#index'
  get '/photos/', to: 'site#photos'
end
