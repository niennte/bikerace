Rails.application.routes.draw do
  resources :slogan_ideas, :path => 'contest'
  resources :riders
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root 'site#index'
  get '/photos-static/', to: 'photos#photos'
  get '/photos/', to: 'photos#gallery'
  get '/location-static', to: 'riders#location'
  get '/location', to: 'riders#map'
end
