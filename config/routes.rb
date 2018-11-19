Rails.application.routes.draw do
  get 'hello_world', to: 'hello_world#index'
  root 'appointments#index'
  namespace :api do
  	namespace :v1 do
  		resources :appointments
		end
	end

end
