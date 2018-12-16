Rails.application.routes.draw do
	resources :categories
  mount_devise_token_auth_for 'User', at: 'auth'

  namespace :api do
  	namespace :v1 do
  		resources :tasks
		end
	end

end
