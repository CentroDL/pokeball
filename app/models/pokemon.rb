class Pokemon < ActiveRecord::Base
  has_and_belongs_to_many :pokeballs

  # def random
  #   rand(Pokemon.count)
  # end

end
