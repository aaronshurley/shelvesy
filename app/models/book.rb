# == Schema Information
#
# Table name: books
#
#  id          :integer          not null, primary key
#  title       :string(255)      not null
#  author      :string(255)      not null
#  isbn        :integer          not null
#  created_at  :datetime
#  updated_at  :datetime
#  description :text             default("TBD"), not null
#  img_url     :string(255)
#

class Book < ActiveRecord::Base
  validates :title, :author, :isbn, :description, presence: true
  validates :title, :isbn, uniqueness: true

  has_many :shelved_books
  has_many :shelves, through: :shelved_books
  has_many :users, through: :shelves
  has_many :reviews
end
