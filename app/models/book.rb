# == Schema Information
#
# Table name: books
#
#  id         :integer          not null, primary key
#  title      :string(255)      not null
#  author     :string(255)      not null
#  isbn       :integer          not null
#  created_at :datetime
#  updated_at :datetime
#

class Book < ActiveRecord::Base
  validates :title, :author, :isbn, :description, presence: true
  validates :title, :isbn, uniqueness: true
end
