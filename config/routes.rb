Rails.application.routes.draw do
  resources :slogan_ideas, :path => 'contest'
  resources :riders
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root 'site#index'
  get '/photos-static/', to: 'site#photos'
  get '/photos/', to: 'site#gallery'
  get '/location', to: 'riders#location'
end
