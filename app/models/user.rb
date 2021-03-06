# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  email           :string(255)      not null
#  password_digest :string(255)      not null
#  session_token   :string(255)      not null
#  gravatar_url    :string(255)
#  created_at      :datetime
#  updated_at      :datetime
#

class User < ActiveRecord::Base
  validates :email, :session_token, presence: true
  validates :password, length: { minimum: 5, allow_nil: true }
  validates :email, uniqueness: true

  has_many :shelves
  has_many :books, through: :shelves, source: :books
  has_many :reviews
  has_many :comments

  attr_reader :password
  after_initialize :ensure_session_token
  after_create :create_default_shelves

  # def gravatar_url
#     "http://www.gravatar.com/avatar/#{ Digest::MD5.hexdigest(email) }"
#   end

  def self.find_by_credentials(user_params)
    user = User.find_by_email(user_params[:email])
    user.try(:is_password?, user_params[:password]) ? user : nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save!
    self.session_token
  end

  protected

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end

  def create_default_shelves
    Shelf.new(name: "Currently Reading", user_id: self.id).save!
    Shelf.new(name: "Read", user_id: self.id).save!
    Shelf.new(name: "To Read", user_id: self.id).save!
  end
end
