class SloganIdea < ApplicationRecord

  EMAIL_FORMAT = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i

  validates :first_name, presence: true, length: { maximum: 50, message: 'cannot be longer than 50 characters.'}
  validates :last_name, presence: true, length: { maximum: 50, message: 'cannot be longer than 50 characters.'}

  validates :email, format: { with: EMAIL_FORMAT, message: 'Please provide a valid email address.' }, length: { maximum: 50, message: 'cannot be longer than 50 characters.'}

  validates :idea, presence: true, length: { maximum: 50, message: 'cannot be longer than 50 characters.'}

end
