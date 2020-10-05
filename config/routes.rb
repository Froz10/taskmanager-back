Rails.application.routes.draw do
  
  namespace :api do
    namespace :v1 do
      resources :tasks
      resources :projects
    end
  end

  root to: "home#index"

end
