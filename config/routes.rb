Rails.application.routes.draw do
  root 'welcome#index'

  resources :pokemons,  except: [:new, :edit]
  resources :pokeballs, except: [:new, :edit] do
  resources :pokemons, except: [:new, :edit]
  end

  # get '/pokemon/random' => 'pokemons#random'

end
