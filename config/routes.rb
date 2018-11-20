Rails.application.routes.draw do
  
  namespace :api do
  	namespace :v1 do
  		# root 'appointments#index'
  		resources :appointments
		end
	end

end
