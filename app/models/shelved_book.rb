# == Schema Information
#
# Table name: shelved_books
#
#  id         :integer          not null, primary key
#  book_id    :integer          not null
#  shelf_id   :integer          not null
#  date_added :datetime         not null
#  date_read  :datetime
#  created_at :datetime
#  updated_at :datetime
#

class ShelvedBook < ActiveRecord::Base
  validates :book_id, :shelf_id, :date_added, presence: true
  validates_uniqueness_of :book_id, scope: :shelf_id

  belongs_to :shelf
  belongs_to :book
end
