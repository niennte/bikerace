class Rider < ApplicationRecord
  validates :first_name, presence: true, length: { maximum: 50, message: 'cannot be longer than 50 characters.'}
  validates :last_name, presence: true, length: { maximum: 50 }
  validates :city, presence: true, length: { maximum: 50 }
  validates :state, presence: true, length: { maximum: 2 }
  validates :latitude, numericality: { allow_nil: true }
  validates :longitude, numericality: { allow_nil: true }

end
