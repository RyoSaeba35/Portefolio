class Contact < ApplicationRecord
  validates :name, :email, :message, presence: true
  validates :email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }
end
