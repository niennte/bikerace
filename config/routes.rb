Rails.application.routes.draw do
  resources :slogan_ideas
  get '/contest-static', to: 'slogan_ideas#contest_static'
  get '/contest', to: 'slogan_ideas#contest'
  get '/validate', to: 'slogan_ideas#validate'
  resources :riders
  get '/list', to: 'riders#list'
  get '/riders-static', to: 'riders#static'

  root 'onepage#home'
  get '/site', to: 'site#index'
  get '/photos-static', to: 'photos#photos'
  get '/photos', to: 'photos#gallery'
  get '/location-static', to: 'riders#location'
  get '/location', to: 'riders#map'
  get '/real-time-updates', to: 'riders#real_time_updates'
end
