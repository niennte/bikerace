class SloganIdea < ApplicationRecord

  EMAIL_FORMAT = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i

  validates :first_name, presence: true
  validates :last_name, presence: true

  validates :email, format: { with: EMAIL_FORMAT, message: 'Please provide a valid email address.' }

  validates :idea, length: { maximum: 50, message: 'cannot be longer than 50 characters.'}

end
