# == Schema Information
#
# Table name: reviews
#
#  id         :integer          not null, primary key
#  title      :string(255)      not null
#  body       :text             not null
#  rating     :integer          not null
#  book_id    :integer          not null
#  user_id    :integer          not null
#  created_at :datetime
#  updated_at :datetime
#

class Review < ActiveRecord::Base
  validates :title, :body, :rating, :book_id, :user_id, presence: true
  validates_uniqueness_of :book_id, scope: :user_id
  validates_numericality_of :rating, in: 1..5

  belongs_to :user
  belongs_to :book
  has_many :comments
end
